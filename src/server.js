import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors());

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);
  app.use('/uploads/photos', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use('*', notFoundHandler);

  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
