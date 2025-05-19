import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

import './workers/mediasoup';
import Logger from './utils/logger';
import { socketConfig } from './config';
import { responseEnhancer } from './middlewares/responseHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = new Logger('app');

const httpServer = http.createServer(app);

const io = new Server(httpServer, { cors: socketConfig.cors });
global.io = io;

app.use(responseEnhancer);

// Import routes after app is defined
import './routes';

// Export app for use in routes
export { app };
export default httpServer;
