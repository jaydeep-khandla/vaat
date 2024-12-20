import * as mediasoup from "mediasoup";

async function initializeWorker() {
  const worker = await mediasoup.createWorker({
    logLevel: "debug",
    logTags: ["info", "ice", "dtls", "rtp", "srtp", "rtcp", "message"],
    rtcMinPort: 10000,
    rtcMaxPort: 10100,
  });

  return worker;
}

const workerPromise = initializeWorker();

export default workerPromise;
