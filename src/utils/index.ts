import crypto from 'crypto'

export const getJSONResponse = (message: string) => ({ message })

export const toHash = (content: string) => {
	return crypto.createHash('sha256').update(content).digest('base64')
}