import { Router } from 'express';

export const routes = Router();

import UserController from './controllers/UserController';
import PostController from './controllers/PostController';

// Users Routes
routes.get('/users',UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.delete);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

// Posts routess
routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);
