import { Router } from 'express'

import TodoController from './controller/TodoController'

const routes = Router()

routes.get('/', (req, res) => res.json({ status: 'running' }))

routes.get('/todos', TodoController.index)
routes.put('/todos', TodoController.update)
routes.post('/todos', TodoController.create)
routes.get('/todos/:id', TodoController.show)

export default routes