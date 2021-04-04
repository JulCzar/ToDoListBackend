import { Request, Response } from 'express'
import { Folder, Todo, User } from '../models'
import { getJSONResponse } from '../utils'

const NOT_FOUND = getJSONResponse('Pasta não encontrada')

interface FolderParams {
	_id: string,
	name: string,
	user: string
}

const FolderController = (function () {
	async function index(req: Request, res: Response) {
		const { user } = req.body as FolderParams

		const userExist = await User.findOne({ _id: user })

		if (!userExist) return res.status(404).json(getJSONResponse('Usuário não encontrado'))

		const folders = await Folder.find({ user })

		return res.json(folders)
	}
	async function create(req: Request, res: Response) {
		const { name, user } = req.body as FolderParams

		const userExist = await User.findOne({ _id: user })

		if (!userExist)
			return res.status(404).json(getJSONResponse('Usuário não encontrado'))

		const folder = await Folder.create({ name, user })

		return res.json(folder)
	}
	async function destroy(req: Request, res: Response) {
		const { id: _id } = req.params

		const folder = await Folder.findOneAndDelete({ _id })

		if (!folder) return res.status(404).json(NOT_FOUND)

		const todos: any[] = await Todo.find({ folder: _id })

		const deleteQueue = todos.map(t => Todo.findOneAndDelete({ _id: t._id }))

		await Promise.all(deleteQueue)

		return res.status(202).json(getJSONResponse('Pasta excluída!'))
	}
	async function update(req: Request, res: Response) {
		const { _id, name } = req.body as FolderParams

		const folder = await Folder.findByIdAndUpdate({ _id }, { name })

		if (!folder) return res.status(404).json(NOT_FOUND)

		const editedFolder = await Folder.findOne({ _id })

		return res.json(editedFolder)
	}

	return {
		create,
		destroy,
		index,
		update
	}
})()

export default FolderController