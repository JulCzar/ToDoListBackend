"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const models_1 = require("../models");
const NOT_FOUND = utils_1.getJSONResponse('Usuário não encontrado!');
const UserController = (function () {
    async function create(req, res) {
        const { name, lastName, email, password } = req.body;
        const userExist = await models_1.User.findOne({ email });
        if (userExist)
            return res.status(401).json(utils_1.getJSONResponse('Email já cadastrado!'));
        const user = await models_1.User.create({
            name,
            email,
            lastName,
            password: utils_1.toHash(password)
        });
        const safeUser = {
            _id: user._id,
            email: user.email,
            lastName: user.lastName,
            name: user.name,
        };
        return res.status(201).json(safeUser);
    }
    async function login(req, res) {
        const { email, password } = req.body;
        const user = await models_1.User.findOne({ email });
        if (!user)
            return res.status(404).json(NOT_FOUND);
        if (user.password !== utils_1.toHash(password))
            return res.status(401).json(utils_1.getJSONResponse('Usuário ou senha Incorretos'));
        else {
            const { password, ...safeUser } = user._doc;
            return res.json(safeUser);
        }
    }
    async function destroy(req, res) {
        const { id: _id } = req.params;
        const user = await models_1.User.findOneAndDelete({ _id });
        if (!user)
            return res.status(404).json(NOT_FOUND);
        const folders = await models_1.Folder.find({ user: _id });
        const foldersDeleteQuery = folders.map(f => models_1.Folder.findOneAndDelete({ _id: f._id }));
        for (const f of folders) {
            const todos = await models_1.Todo.find({ folder: f._id });
            const todosDeleteQuery = todos.map(t => models_1.Todo.findOneAndDelete({ _id: t._id }));
            await Promise.all(todosDeleteQuery);
        }
        await Promise.all(foldersDeleteQuery);
        return res.status(202).json(utils_1.getJSONResponse('Usuário excluído!'));
    }
    async function update(req, res) {
        const { _id, name, lastName } = req.body;
        const user = await models_1.User.findOneAndUpdate({ _id }, {
            name,
            lastName
        });
        if (!user)
            return res.status(404).json(NOT_FOUND);
        const editedUser = await models_1.User.findOne({ _id });
        return res.json(editedUser);
    }
    return {
        create,
        destroy,
        login,
        update
    };
})();
exports.default = UserController;
