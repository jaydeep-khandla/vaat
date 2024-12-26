import { Socket } from "socket.io";
import {
  Consumer,
  DataConsumer,
  DataProducer,
  Producer,
  Router,
  WebRtcServer,
  WebRtcTransport,
  Worker,
} from "mediasoup/node/lib/types";
import { Peer, Room } from "socket";
import { TransportObj } from "../types/mediasoup";

declare global {
  var rooms: Map<string, Room>;
  var peers: Map<string, Peer>;
  var io: any;
  var webRtcServers: Map<string, WebRtcServer>;
  var routers: Map<string, Router>;
  var transports: Map<string, TransportObj[]>;
  var producers: Map<string, Producer[]>;
  var consumers: Map<string, Consumer[]>;
  var dataProducers: Map<string, DataProducer[]>;
  var dataConsumers: Map<string, DataConsumer[]>;
  var worker: Worker;
}

export {};
