import { Server, Socket } from "socket.io";
import {
  ActiveSpeakerObserver,
  AudioLevelObserver,
  Consumer,
  DataConsumer,
  DataProducer,
  Producer,
  Router,
  WebRtcServer,
  WebRtcTransport,
  // WebRtcTransport,
  Worker,
} from "mediasoup/node/lib/types";
import { Peer, Room } from "socket";
import { TransportObj } from "../types/mediasoup";

declare global {
  var rooms: Map<string, Room>;
  var peers: Map<string, Peer>;
  var meetings: Map<string, string>;
  var io: Server;
  var webRtcServers: Map<string, WebRtcServer>;
  var routers: Map<string, Router>;
  var audioLevelObservers: Map<string, AudioLevelObserver>;
  var activeSpeakerObservers: Map<string, ActiveSpeakerObserver>;
  var transports: Map<string, WebRtcTransport>;
  var producers: Map<string, Producer[]>;
  var consumers: Map<string, Consumer[]>;
  var dataProducers: Map<string, DataProducer[]>;
  var dataConsumers: Map<string, DataConsumer[]>;
  var worker: Worker;
}

export {};
