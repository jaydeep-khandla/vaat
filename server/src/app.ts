import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import './workers/mediasoup';
import Logger from './utils/logger';
import { socketConfig } from './config';
import { responseEnhancer } from './middlewares/responseHandler';

const app = express();

const logger = new Logger('app');

const httpServer = http.createServer(app);

const io = new Server(httpServer, { cors: socketConfig.cors });
global.io = io;

app.use(responseEnhancer);

app.get('/', (_req, res) => {
  res.sendResponse(true, 'Ahh...! We got You...', 200, null);
});

export default httpServer;
