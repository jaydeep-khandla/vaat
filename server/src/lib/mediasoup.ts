import * as mediasoup from "mediasoup";
import Logger from "../utils/logger";
import { Worker } from "mediasoup/node/lib/types";

const logger = new Logger("observer");

function runMediasoupObserver() {
  mediasoup.observer.on("newworker", workerEvent);
}

function workerEvent(worker: Worker) {
  (global as any).worker = worker; // TO-DO: Find a better way to do this

  logger.info("New worker created [pid:%d]", worker.pid);
}

export { runMediasoupObserver };
