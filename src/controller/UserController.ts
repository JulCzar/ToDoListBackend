import { Request, Response } from 'express'

import { getJSONResponse, toHash } from '../utils'
import { User } from '../models'

const NOT_FOUND = getJSONResponse('Usuário não encontrado!')

interface UserParams {
	_id: string,
	email: string,
	lastName: string,
	name: string,
	password: string
}

const UserController = (function () {
	async function create(req: Request, res: Response) {
		const { name, lastName, email, password } = req.body as UserParams

		const userExist = await User.findOne({ email })

		if (userExist)
			return res.status(401).json(getJSONResponse('Email já cadastrado!'))

		const user = await User.create({
			name,
			email,
			lastName,
			password: toHash(password)
		})

		return res.status(201).json(user)
	}
	async function login(req: Request, res: Response) {
		const { email, password } = req.body as UserParams

		const user: { _doc: UserParams } = await User.findOne({ email })

		if (!user) return res.status(404).json(NOT_FOUND)

		if (user._doc.password !== toHash(password))
			return res.status(401).json(getJSONResponse('Usuário ou senha Incorretos'))
		else {
			const { password, ...safeUser } = user._doc

			return res.json(safeUser)
		}
	}
	async function destroy(req: Request, res: Response) {
		const { id: _id } = req.params

		const user = await User.findOneAndDelete({ _id })

		if (!user) return res.status(404).json(NOT_FOUND)

		return res.status(202).json(getJSONResponse('Usuário excluído!'))
	}
	async function update(req: Request, res: Response) {
		const { _id, name, lastName } = req.body as UserParams

		const user = await User.findOneAndUpdate({ _id }, {
			name,
			lastName
		})

		if (!user) return res.status(404).json(NOT_FOUND)

		const editedUser = await User.findOne({ _id })

		return res.json(editedUser)
	}

	return {
		create,
		destroy,
		login,
		update
	}
})()

export default UserController