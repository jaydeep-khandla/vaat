import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
} from "mediasoup/node/lib/WebRtcTransportTypes";
import { Socket } from "socket.io";

interface JoinRoomAckCallback {
  (rtpCapabilities: any): void;
}

interface TransportAckCallback {
  (params: {
    id: string;
    iceParameters: IceParameters;
    iceCandidates: IceCandidate[];
    dtlsParameters: DtlsParameters;
  }): void;
}

// interface Room {
//   id: string;
//   sockets: Socket[];
//   router: string;
//   webRtcServer: string;
//   audioLevelObserver: string | null;
//   activeSpeakerObserver: string | null;
// }

interface Peer {
  id: string;
  socketId: string;
  meetingId: string;
  routerId: string;
  transports: string[];
  producers: string[];
  consumers: string[];
}

export { JoinRoomAckCallback, TransportAckCallback, Peer };
