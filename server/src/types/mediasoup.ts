import { WorkerLogLevel, WorkerLogTag } from "mediasoup/node/lib/types";

interface WorkerSettings {
  logLevel: WorkerLogLevel;

  logTags: WorkerLogTag[];

  rtcMinPort: number;

  rtcMaxPort: number;
}

export { WorkerSettings };
