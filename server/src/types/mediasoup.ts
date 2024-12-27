import {
  RtpCodecCapability,
  WebRtcTransport,
  WorkerLogLevel,
  WorkerLogTag,
} from "mediasoup/node/lib/types";

interface WorkerSettings {
  logLevel: WorkerLogLevel;

  logTags: WorkerLogTag[];

  rtcMinPort: number;

  rtcMaxPort: number;
}

interface RouterSettings {
  mediaCodecs: RtpCodecCapability[];
}

interface TransportObj {
  roomId: string;
  socketId: string;
  isConsumer: boolean;
}

export { WorkerSettings, RouterSettings, TransportObj };
