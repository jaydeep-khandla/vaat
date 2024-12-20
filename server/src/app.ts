import express from "express";
const app = express();

import workerPromise from "./workers/mediasoup";
import Logger from "./utils/logger";

const logger = new Logger("app");

workerPromise
  .then((worker) => {
    // Set the worker in the global scope
    (global as any).worker = worker;
    logger.info("Worker initialized and set in global scope.");
  })
  .catch((error) => {
    logger.error("Failed to initialize worker: ", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
