import * as mediasoup from "mediasoup";
import Logger from "../utils/logger";

const logger = new Logger("mediasoup");

async function initializeWorker() {
  const worker = await mediasoup.createWorker({
    logLevel: "debug",
    logTags: ["info", "ice", "dtls", "rtp", "srtp", "rtcp", "message"],
    rtcMinPort: 10000,
    rtcMaxPort: 10100,
  });

  return worker;
}

initializeWorker()
  .then((worker) => {
    // Set the worker in the global scope
    (global as any).worker = worker;
    logger.info("Worker initialized and set in global scope.");
  })
  .catch((error) => {
    logger.error("Failed to initialize worker: ", error);
  });

export default initializeWorker;
