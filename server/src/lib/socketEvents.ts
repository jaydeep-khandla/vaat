import {
  AudioLevelObserver,
  Router,
  WebRtcServer,
  WebRtcTransportOptions,
} from 'mediasoup/node/lib/types';
import Logger from '../utils/logger';
import { Namespace, Socket } from 'socket.io';
import { mediasoupConfig } from '../config';
import { JoinRoomAckCallback, Peer, TransportAckCallback } from 'socket';
import Room from './room';
import socket from '../config/socket';

const logger = new Logger('socket-events');

const peers = new Map<string, Peer>();
const meetings = new Map<string, string>();

// Set global variables
global.peers = peers;
global.meetings = meetings;

class SocketEvents {
  private meetingNamespace: Namespace;
  private socket: Socket;

  constructor(socket: Socket, meetingNamespace: Namespace) {
    this.socket = socket;
    this.meetingNamespace = meetingNamespace;

    // Bind methods to the class instance
    this.handleSocketEvents = this.handleSocketEvents.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleAcceptedJoinPermission =
      this.handleAcceptedJoinPermission.bind(this);
    this.handleRejectedJoinPermission =
      this.handleRejectedJoinPermission.bind(this);
    this.handleWebRtcTransport = this.handleWebRtcTransport.bind(this);
  }

  // Initialize socket event listeners
  public handleSocketEvents() {
    logger.info('Socket connected [socketId:%s]', this.socket.id);

    // Register event listeners
    this.socket.on('join-room', this.handleJoinRoom);

    this.socket.on(
      'accepted-join-permission',
      this.handleAcceptedJoinPermission
    );

    this.socket.on(
      'rejected-join-permission',
      this.handleRejectedJoinPermission
    );

    this.socket.on('create-webRtcTransport', this.handleWebRtcTransport);

    this.socket.on('disconnect', () => {
      logger.info('Socket disconnected [socketId:%s]', this.socket.id);
    });
  }

  // Handle join-room event
  private async handleJoinRoom(
    meetingId: string,
    callback: JoinRoomAckCallback
  ): Promise<void> {
    logger.info('Joining room [roomId:%s]', meetingId);

    const existingRoom = rooms.get(meetingId);

    if (!existingRoom) {
      logger.info('Room not found [roomId:%s]', meetingId);
      const room = await Room.create(meetingId, this.socket);

      logger.info('New Room created [roomId:%s]', meetingId);

      rooms.set(meetingId, room);
    }

    const room = rooms.get(meetingId);

    if (room) {
      const userExists = room.peers.get(this.socket.id);

      if (!userExists) {
        // Add the user socket to the sockets array
        this.meetingNamespace.to(room.host.id).emit('request-join-permission', {
          socketId: this.socket.id,
          meetingId,
        });
      }
    }

    const rtpCapabilities: any = room.mediasoupRouter.rtpCapabilities;

    callback(rtpCapabilities);
  }

  // Handle accepted-join-permission event
  private handleAcceptedJoinPermission(meetingId: string) {
    const room = rooms.get(meetingId);

    this.socket.join(meetingId);
    room.peers.set(this.socket.id, this.socket);
    peers.set(this.socket.id, {
      id: this.socket.id,
      socketId: this.socket.id,
      meetingId,
      routerId: room.mediasoupRouter.id,
      transports: [],
      producers: [],
      consumers: [],
    });

    // Notify other users that a new user has connected
    this.socket
      .to(meetingId)
      .emit('user-joined', { socketId: this.socket.id, meetingId });
  }

  // Handle rejected-join-permission event
  private handleRejectedJoinPermission() {
    this.meetingNamespace.to(this.socket.id).emit('user-permission-rejected');
  }

  // Handle create-webRtcTransport event
  private async handleWebRtcTransport(
    isConsumer: boolean,
    callback: TransportAckCallback
  ) {
    const peer: Peer = peers.get(this.socket.id);

    if (!peer) {
      logger.error('Peer not found [socketId:%s]', this.socket.id);
      return;
    }

    const router: Router = routers.get(peer.routerId);

    if (!router) {
      logger.error('Router not found [roomId:%s]', peer.meetingId);
      return;
    }

    const webRtcTransport = await router.createWebRtcTransport({
      webRtcServer: worker.appData.webRtcServer,
      ...mediasoupConfig.webRtcTransportOptions,
      appData: {
        roomId: peer.meetingId,
        socketId: this.socket.id,
        isConsumer,
      },
    } as WebRtcTransportOptions);

    if (isConsumer) {
      peer.consumers.push(webRtcTransport.id);
    } else {
      peer.producers.push(webRtcTransport.id);
    }

    peers.get(this.socket.id).transports.push(webRtcTransport.id);

    const params = {
      id: webRtcTransport.id,
      iceParameters: webRtcTransport.iceParameters,
      iceCandidates: webRtcTransport.iceCandidates,
      dtlsParameters: webRtcTransport.dtlsParameters,
    };

    callback(params);
  }
}

// Usage:
export function initializeSocketEvents(
  meetingNamespace: Namespace,
  socket: Socket
) {
  const socketEvents = new SocketEvents(socket, meetingNamespace);
  socketEvents.handleSocketEvents();
}
