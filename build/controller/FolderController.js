"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("~/models");
const utils_1 = require("~/utils");
const NOT_FOUND = utils_1.getJSONResponse('Pasta não encontrada');
const FolderController = (function () {
    async function index(req, res) {
        const { user } = req.body;
        const userExist = await models_1.User.findOne({ _id: user });
        if (!userExist)
            return res.status(404).json(utils_1.getJSONResponse('Usuário não encontrado'));
        const folders = await models_1.Folder.find({ user });
        return res.json(folders);
    }
    async function create(req, res) {
        const { name, user } = req.body;
        const userExist = await models_1.User.findOne({ _id: user });
        if (!userExist)
            return res.status(404).json(utils_1.getJSONResponse('Usuário não encontrado'));
        const folder = await models_1.Folder.create({ name, user });
        return res.json(folder);
    }
    async function destroy(req, res) {
        const { id: _id } = req.params;
        const folder = await models_1.Folder.findOneAndDelete({ _id });
        if (!folder)
            return res.status(404).json(NOT_FOUND);
        const todos = await models_1.Todo.find({ folder: _id });
        const deleteQueue = todos.map(t => models_1.Todo.findOneAndDelete({ _id: t._id }));
        await Promise.all(deleteQueue);
        return res.status(202).json(utils_1.getJSONResponse('Pasta excluída!'));
    }
    async function update(req, res) {
        const { _id, name } = req.body;
        const folder = await models_1.Folder.findByIdAndUpdate({ _id }, { name });
        if (!folder)
            return res.status(404).json(NOT_FOUND);
        const editedFolder = await models_1.Folder.findOne({ _id });
        return res.json(editedFolder);
    }
    return {
        create,
        destroy,
        index,
        update
    };
})();
exports.default = FolderController;
