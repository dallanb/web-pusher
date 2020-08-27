import express from 'express';
import { logger } from '../middlewares';

class Middlewares {
    initLogger(app: express.Application): void {
        app.use(logger);
    }
}

export default new Middlewares();
