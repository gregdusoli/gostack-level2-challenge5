import { Router } from 'express';
import transactionRouter from './transaction.routes';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: '🚀 Hello world' }),
);

routes.use('/transactions', transactionRouter);

export default routes;
