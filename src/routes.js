import { Router } from 'express';

import MoviesController from './app/controllers/MoviesController';

const routes = new Router();

// Movies
routes.get('/movie', MoviesController.index);
routes.get('/movie/:id', MoviesController.index);
routes.post('/movie', MoviesController.store);

export default routes;
