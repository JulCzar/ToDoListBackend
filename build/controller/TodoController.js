"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("~/models");
const utils_1 = require("~/utils");
const NOT_FOUND = utils_1.getJSONResponse('Tarefa não encontrada!');
const TodoController = (function () {
    async function index(req, res) {
        const todos = await models_1.Todo.find();
        return res.json(todos);
    }
    async function show(req, res) {
        const { id } = req.params;
        const todo = await models_1.Todo.findById(id);
        if (!todo)
            return res.status(404).json(NOT_FOUND);
        return res.json(todo);
    }
    async function create(req, res) {
        const { title, description, folder, endAt } = req.body;
        const folderExist = await models_1.Folder.findOne({ _id: folder });
        if (!folderExist)
            return res.status(404).json(utils_1.getJSONResponse('A Pasta não existe'));
        const created = new Date();
        const todo = await models_1.Todo.create({
            created,
            description,
            edited: created,
            endAt,
            folder,
            status: false,
            title
        });
        return res.status(201).json(todo);
    }
    async function update(req, res) {
        const { _id, endAt, title, description, folder, status } = req.body;
        const edited = new Date();
        const todo = await models_1.Todo.findOneAndUpdate({ _id }, {
            endAt,
            title,
            description,
            folder,
            edited,
            status
        });
        if (!todo)
            return res.status(404).json(NOT_FOUND);
        const editedTodo = await models_1.Todo.findOne({ _id });
        return res.json(editedTodo);
    }
    async function destroy(req, res) {
        const { id: _id } = req.params;
        const todo = await models_1.Todo.findOneAndDelete({ _id });
        if (!todo)
            return res.status(404).json(NOT_FOUND);
        return res.status(202).json(utils_1.getJSONResponse('Tarefa Excluída!'));
    }
    return {
        create,
        destroy,
        index,
        show,
        update
    };
})();
exports.default = TodoController;
