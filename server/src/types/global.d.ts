import { Server, Socket } from 'socket.io';
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
} from 'mediasoup/node/lib/types';
import { Peer } from 'socket';
import Room from '../lib/room';
import { TransportObj } from '../types/mediasoup';

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

  namespace Express {
    interface Response {
      /**
       * Sends a standardized API response
       * @param success Indicates if the request was successful
       * @param message The message to include in the response
       * @param status The HTTP status code to set for the response
       * @param data Optional data to include in the response
       * @returns The response object for chaining
       */
      sendResponse: (
        success: boolean,
        message: string,
        status: number,
        data?: any
      ) => Express.Response;
    }
  }
}

export {};
