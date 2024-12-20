import express from "express";
const app = express();

import "./workers/mediasoup";
import Logger from "./utils/logger";

const logger = new Logger("app");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
