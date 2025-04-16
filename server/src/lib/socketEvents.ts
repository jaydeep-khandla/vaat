import { Router, WebRtcTransportOptions } from 'mediasoup/node/lib/types';
import Logger from '../utils/logger';
import { Namespace, Socket } from 'socket.io';
import { mediasoupConfig } from '../config';
import {
  JoinRoomAckCallback,
  Peer,
  TransportAckCallback,
} from '../types/socket';
import Room from './room';

const logger = new Logger('socket-events');

// Initialize global maps if not already initialized
if (!global.rooms) global.rooms = new Map<string, Room>();
if (!global.peers) global.peers = new Map<string, Peer>();
if (!global.meetings) global.meetings = new Map<string, string>();
if (!global.routers) global.routers = new Map<string, Router>();

const { rooms, peers, routers, worker } = global;

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
    try {
      logger.info('Joining room [roomId:%s]', meetingId);

      const existingRoom = rooms.get(meetingId);
      let room: Room;

      if (!existingRoom) {
        logger.info('Room not found [roomId:%s]', meetingId);
        room = await Room.create(meetingId, this.socket);
        logger.info('New Room created [roomId:%s]', meetingId);
        rooms.set(meetingId, room);
      } else {
        room = existingRoom;
      }

      if (!room?.mediasoupRouter) {
        throw new Error('Router not initialized');
      }

      const userExists = room.peers.get(this.socket.id);

      if (!userExists && room.host) {
        this.meetingNamespace.to(room.host.id).emit('request-join-permission', {
          socketId: this.socket.id,
          meetingId,
        });
      }

      callback(room.mediasoupRouter.rtpCapabilities);
    } catch (error) {
      logger.error('Error in handleJoinRoom:', error);
      callback(null);
    }
  }

  // Handle accepted-join-permission event
  private handleAcceptedJoinPermission(meetingId: string) {
    const room = rooms.get(meetingId);
    if (!room || !room.mediasoupRouter) return;

    this.socket.join(meetingId);
    room.peers.set(this.socket.id, this.socket);

    const peer: Peer = {
      id: this.socket.id,
      socketId: this.socket.id,
      meetingId,
      routerId: room.mediasoupRouter.id,
      transports: [],
      producers: [],
      consumers: [],
    };

    peers.set(this.socket.id, peer);

    this.socket.to(meetingId).emit('user-joined', {
      socketId: this.socket.id,
      meetingId,
    });
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
    const peer = peers.get(this.socket.id);

    if (!peer) {
      logger.error('Peer not found [socketId:%s]', this.socket.id);
      return;
    }

    const router = routers.get(peer.routerId);

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

    peer.transports.push(webRtcTransport.id);

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
