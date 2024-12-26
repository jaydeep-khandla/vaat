// import "./types/global";
import express from "express";
const app = express();

import "./workers/mediasoup";
import Logger from "./utils/logger";

const logger = new Logger("app");

import http from "http";

const httpServer = http.createServer(app);

import { Server } from "socket.io";
import { socketConfig } from "./config";

const io = new Server(httpServer, { cors: socketConfig.cors });
global.io = io;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default httpServer;
