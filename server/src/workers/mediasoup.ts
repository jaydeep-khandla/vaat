import * as mediasoup from "mediasoup";
import { mediasoupConfig } from "../config";
import { WorkerSettings } from "../types/mediasoup";
import Logger from "../utils/logger";
import { runMediasoupObserver } from "../lib/observers";

const logger = new Logger("mediasoup");

async function initializeWorker() {
  runMediasoupObserver();

  const worker = await mediasoup.createWorker(
    mediasoupConfig.worker as WorkerSettings
  );

  return worker;
}

initializeWorker().catch((error) => {
  logger.error("Failed to initialize worker: ", error);
});

export default initializeWorker;
