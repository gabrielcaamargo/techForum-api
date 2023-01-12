import { Router } from 'express';

export const routes = Router();
import UserController from './controllers/UserController';

routes.get('/users',UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.delete);
routes.post('/users/:id', UserController.store);
routes.put('/users/:id', UserController.update);
