import { Router } from 'express';
import { apiRouter } from './api';

export const appRouter = Router();

appRouter.use('/api', apiRouter);
