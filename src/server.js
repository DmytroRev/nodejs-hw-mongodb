import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
    const app = express();

    app.use(
        express.json({
            type: ['application/json', 'application/vnd.api+json'],
            limit: '100kb'
        })
    );

 app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
       app.use(cors());




    app.use('/contacts',contactsRouter);

    app.use('*', notFoundHandler);

    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

