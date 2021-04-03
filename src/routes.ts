import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => res.json({ status: 'running' }))

export default routes