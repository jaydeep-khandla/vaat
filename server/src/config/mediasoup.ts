import {
  ActiveSpeakerObserverOptions,
  AudioLevelObserverOptions,
  WebRtcServerOptions,
  // WebRtcTransportOptions,
} from "mediasoup/node/lib/types";
import { RouterSettings, WorkerSettings } from "../types/mediasoup";

const worker = global.worker;

export default {
  worker: {
    logLevel: "debug",
    logTags: ["info", "ice", "dtls", "rtp", "srtp", "rtcp", "message"],
    rtcMinPort: 10000,
    rtcMaxPort: 10100,
  } as WorkerSettings,
  webRtcServerOptions: {
    listenInfos: [
      {
        protocol: "udp",
        ip: process.env.MEDIASOUP_LISTEN_IP || "0.0.0.0",
        // announcedAddress : process.env.MEDIASOUP_ANNOUNCED_IP,
        // port: 44444,
        portRange: {
          min: process.env.MEDIASOUP_MIN_PORT || 40000,
          max: process.env.MEDIASOUP_MAX_PORT || 49999,
        },
      },
      {
        protocol: "tcp",
        ip: process.env.MEDIASOUP_LISTEN_IP || "0.0.0.0",
        // announcedAddress : process.env.MEDIASOUP_ANNOUNCED_IP,
        // port: 44444,
        portRange: {
          min: process.env.MEDIASOUP_MIN_PORT || 40000,
          max: process.env.MEDIASOUP_MAX_PORT || 49999,
        },
      },
    ],
  } as WebRtcServerOptions,
  routerOptions: {
    mediaCodecs: [
      {
        kind: "audio",
        mimeType: "audio/opus",
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: "video",
        mimeType: "video/VP8",
        clockRate: 90000,
        parameters: {
          "x-google-start-bitrate": 1000,
        },
      },
      {
        kind: "video",
        mimeType: "video/VP9",
        clockRate: 90000,
        parameters: {
          "profile-id": 2,
          "x-google-start-bitrate": 1000,
        },
      },
      {
        kind: "video",
        mimeType: "video/h264",
        clockRate: 90000,
        parameters: {
          "packetization-mode": 1,
          "profile-level-id": "4d0032",
          "level-asymmetry-allowed": 1,
          "x-google-start-bitrate": 1000,
        },
      },
      {
        kind: "video",
        mimeType: "video/h264",
        clockRate: 90000,
        parameters: {
          "packetization-mode": 1,
          "profile-level-id": "42e01f",
          "level-asymmetry-allowed": 1,
          "x-google-start-bitrate": 1000,
        },
      },
    ],
  } as RouterSettings,
  audioLevelObserverOptions: {
    maxEntries: 15,
    threshold: -80,
    interval: 500,
  } as AudioLevelObserverOptions,
  activeSpeakerObserverOptions: {
    threshold: -80,
    interval: 500,
  } as ActiveSpeakerObserverOptions,
  webRtcTransportOptions: {
    // listenInfos is not needed since webRtcServer is used.
    // However passing MEDIASOUP_USE_WEBRTC_SERVER=false will change it.
    // webRtcServer: worker?.appData?.webRtcServer as WebRtcServer,
    initialAvailableOutgoingBitrate: 1000000,
    minAvailableOutgoingBitrate: 600000,
    maxSctpMessageSize: 262144,
    // Additional options that are not part of WebRtcTransportOptions.
    // maxIncomingBitrate: 1500000,
  },
};
