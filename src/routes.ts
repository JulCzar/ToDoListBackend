import { Router } from 'express'

import { FolderController, TodoController, UserController } from '~/controller'

const routes = Router()

routes.get('/', (req, res) => res.json({ status: 'running' }))

// Rotas das Tarefas
routes.get('/todos', TodoController.index)
routes.put('/todos', TodoController.update)
routes.post('/todos', TodoController.create)
routes.get('/todos/:id', TodoController.show)
routes.delete('/todos/:id', TodoController.destroy)

// Rotas de gerenciamento
routes.get('/folders', FolderController.index)
routes.put('/folders', FolderController.update)
routes.post('/folders', FolderController.create)
routes.delete('/folders', FolderController.destroy)

// Gerenciamento de Usuário
routes.put('/users', UserController.update)
routes.post('/login', UserController.login)
routes.post('/users', UserController.create)
routes.delete('/users/:id', UserController.destroy)

export default routes