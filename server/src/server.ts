import mongoose from 'mongoose';
import httpServer from './app';
import { connectDB } from './config/db';

import Logger from './utils/logger';
import { socketConnection } from './utils/socket';

const logger = new Logger('server');

// Start the server
const port = process.env.PORT || 8000;

connectDB()
  .then(async function initserver() {
    await mongoose.connection.db?.command({ ping: 1 });
    httpServer.listen(port, function serverListening() {
      logger.info(`Server started at http://localhost:${port}`);
      socketConnection();
    });
  })
  .catch(function catchDBError(error) {
    logger.error('Error connecting to the database: ', error);
    process.exit(1);
  });
