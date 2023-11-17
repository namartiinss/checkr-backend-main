import { Router } from 'express';
import * as UserController from './controller/UserController';
import * as TaskController from './controller/TasksController';

const routes = Router();

// Rotas para usuários
routes.post('/users', UserController.createUser);
routes.post('/users/check/', UserController.checkUserExists);

// Rotas para tarefas de usuários
routes.post('/users/:userId/tasks', TaskController.createTaskForUser);
routes.get('/users/:userId/tasks', TaskController.getUserTasks);
routes.put('/users/:userId/tasks/:taskId', TaskController.editUserTask);
routes.delete('/users/:userId/tasks/:taskId', TaskController.deleteUserTask);

export default routes;
