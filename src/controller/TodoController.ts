import { Request, Response } from 'express'
import Todo from '../models/Todo'

const NOT_FOUND = { message: "Todo não encontrado" }

interface bodyParams {
	_id?: String
	description: String
	folder: string
	endAt: String
	status?: Boolean
	title: String
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
		const { title, description, folder, endAt } = req.body as bodyParams

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

		return res.json(todo)
	}
	async function update(req: Request, res: Response) {
		const {
			_id,
			endAt,
			title,
			description,
			folder,
			status
		} = req.body as bodyParams

		const edited = new Date();

		const todo = await Todo.findOneAndUpdate({ _id }, {
			endAt,
			title,
			description,
			folder,
			edited,
			status
		})

		return res.json(todo)
	}
	async function destroy(req: Request, res: Response) {
		const { id: _id } = req.params

		const todo = await Todo.findOneAndDelete({ _id })

		if (!todo) return res.status(404).json(NOT_FOUND)

		return res.json(todo)
	}

	return {
		create,
		destroy,
		index,
		show,
		update
	}
})()

export default TodoController