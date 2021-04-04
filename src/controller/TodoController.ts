import { Request, Response } from 'express'
import { Folder, Todo } from '../models'
import { getJSONResponse } from '../utils';

const NOT_FOUND = getJSONResponse('Tarefa não encontrada!')

interface todoParams {
	_id?: string
	description: string
	endAt: string
	folder: string
	status?: Boolean
	title: string
}

const TodoController = (function () {
	async function index(req: Request, res: Response) {
		const todos = await Todo.find()

		return res.json(todos)
	}
	async function show(req: Request, res: Response) {
		const { id } = req.params

		const todo = await Todo.findById(id)

		if (!todo) return res.status(404).json(NOT_FOUND)

		return res.json(todo)
	}
	async function create(req: Request, res: Response) {
		const { title, description, folder, endAt } = req.body as todoParams
		
		const folderExist = await Folder.findOne({ _id: folder })

		console.log(folderExist)
		
		if (!folderExist) return res.status(404).json(getJSONResponse('A Pasta não existe'))

		const created = new Date()

		const todo = await Todo.create({
			created,
			description,
			edited: created,
			endAt,
			folder,
			status: false,
			title
		})

		return res.status(201).json(todo)
	}
	async function update(req: Request, res: Response) {
		const {
			_id,
			endAt,
			title,
			description,
			folder,
			status
		} = req.body as todoParams

		const edited = new Date();

		const todo = await Todo.findOneAndUpdate({ _id }, {
			endAt,
			title,
			description,
			folder,
			edited,
			status
		})

		if (!todo) return res.status(404).json(NOT_FOUND)

		const editedTodo = await Todo.findOne({ _id })

		return res.json(editedTodo)
	}
	async function destroy(req: Request, res: Response) {
		const { id: _id } = req.params

		const todo = await Todo.findOneAndDelete({ _id })

		if (!todo) return res.status(404).json(NOT_FOUND)

		return res.status(202).json(getJSONResponse('Tarefa Excluída!'))
	}

	return {
		create,
		destroy,
		index,
		show,
		update
	}
})();

export default TodoController