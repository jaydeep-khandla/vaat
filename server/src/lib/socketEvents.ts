import {
  AudioLevelObserver,
  Router,
  WebRtcServer,
  WebRtcTransportOptions,
} from "mediasoup/node/lib/types";
import Logger from "../utils/logger";
import { Namespace, Socket } from "socket.io";
import { mediasoupConfig } from "../config";
import { JoinRoomAckCallback, Peer, TransportAckCallback } from "socket";
import Room from "./room";
import socket from "../config/socket";

const logger = new Logger("socket-events");

const peers = new Map<string, Peer>();
const meetings = new Map<string, string>();

// Set global variables
global.peers = peers;
global.meetings = meetings;

function handleSocketEvents(meetingNamespace: Namespace, socket: Socket) {
  logger.info("Socket connected [socketId:%s]", socket.id);

  // logger.info("Rooms: %o", global.rooms);

  // Register the join-room event listener
  socket.on("join-room", (meetingId: string, callback: JoinRoomAckCallback) =>
    handleJoinRoom(meetingNamespace, socket, meetingId, callback)
  );

  // Register the accepted-join-permission event listener
  socket.on("accepted-join-permission", (meetingId: string) =>
    handleAcceptedJoinPermission(socket, meetingId)
  );

  // Register the rejected-join-permission event listener
  socket.on("rejected-join-permission", () =>
    handleRejectedJoinPermission(socket, meetingNamespace)
  );

  // Register the create-webRtcTransport event listener
  socket.on(
    "create-webRtcTransport",
    (isConsumer: boolean, callback: TransportAckCallback) =>
      handleWebRtcTransport(socket, isConsumer, callback)
  );

  socket.on("disconnect", function onSocketDisconnect() {
    logger.info("Socket disconnected [socketId:%s]", socket.id);
  });
}

async function handleJoinRoom(
  meetingNamespace: Namespace,
  socket: Socket,
  meetingId: string,
  callback: JoinRoomAckCallback
): Promise<void> {
  logger.info("Joining room [roomId:%s]", meetingId);

  const existingRoom = rooms.get(meetingId);

  if (!existingRoom) {
    logger.info("Room not found [roomId:%s]", meetingId);
    const room = await Room.create(meetingId, socket);

    rooms.set(meetingId, room);
  }

  const room = rooms.get(meetingId);

  if (room) {
    const userExists = room.peers.get(socket.id);

    if (!userExists) {
      // Add the user socket to the sockets array
      meetingNamespace
        .to(room.host.id)
        .emit("request-join-permission", { socketId: socket.id, meetingId });
    }
  }

  const rtpCapabilities: any = room.mediasoupRouter.rtpCapabilities;

  // logger.info("RTP Capabilities: %o", rtpCapabilities);

  // logger.info("Routers: %o", global.routers);
  // logger.info("Rooms: %o", global.rooms);

  callback(rtpCapabilities);
}

function handleAcceptedJoinPermission(socket: Socket, meetingId: string) {
  const room = rooms.get(meetingId);

  socket.join(meetingId);
  room.peers.set(socket.id, socket);
  peers.set(socket.id, {
    id: socket.id,
    socketId: socket.id,
    meetingId,
    routerId: room.mediasoupRouter.id,
    transports: [],
    producers: [],
    consumers: [],
  });

  // Notify other users that a new user has connected
  socket.to(meetingId).emit("user-joined", { socketId: socket.id, meetingId });
}

function handleRejectedJoinPermission(
  socket: Socket,
  meetingNamespace: Namespace
) {
  meetingNamespace.to(socket.id).emit("user-permission-rejected");
}

async function handleWebRtcTransport(
  socket: Socket,
  isConsumer: boolean,
  callback: TransportAckCallback
) {
  const peer: Peer = peers.get(socket.id);

  if (!peer) {
    logger.error("Peer not found [socketId:%s]", socket.id);
    return;
  }

  const router: Router = routers.get(peer.routerId);

  if (!router) {
    logger.error("Router not found [roomId:%s]", peer.meetingId);
    return;
  }

  const webRtcTransport = await router.createWebRtcTransport({
    webRtcServer: worker.appData.webRtcServer,
    ...mediasoupConfig.webRtcTransportOptions,
    appData: {
      roomId: peer.meetingId,
      socketId: socket.id,
      isConsumer,
    },
  } as WebRtcTransportOptions);

  if (isConsumer) {
    peer.consumers.push(webRtcTransport.id);
  } else {
    peer.producers.push(webRtcTransport.id);
  }

  peers.get(socket.id).transports.push(webRtcTransport.id);

  const params = {
    id: webRtcTransport.id,
    iceParameters: webRtcTransport.iceParameters,
    iceCandidates: webRtcTransport.iceCandidates,
    dtlsParameters: webRtcTransport.dtlsParameters,
  };

  callback(params);
}

export { handleSocketEvents };
