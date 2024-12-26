import { Router, WebRtcTransportOptions } from "mediasoup/node/lib/types";
import Logger from "../utils/logger";
import { Namespace, Socket } from "socket.io";
import { mediasoupConfig } from "../config";
import { JoinRoomAckCallback, Peer, Room, TransportAckCallback } from "socket";

const logger = new Logger("socket-events");

const rooms = new Map<string, Room>();
const peers = new Map<string, Peer>();

global.rooms = rooms;
global.peers = peers;

function handleSocketEvents(meetingNamespace: Namespace, socket: Socket) {
  logger.info("Socket connected [socketId:%s]", socket.id);

  // logger.info("Rooms: %o", global.rooms);

  // Register the join-room event listener
  socket.on("join-room", (meetingId: string, callback: JoinRoomAckCallback) =>
    handleJoinRoom(socket, meetingId, callback)
  );

  // Register the create-webRtcTransport event listener
  socket.on(
    "create-webRtcTransport",
    (isConsumer: boolean, callback: TransportAckCallback) =>
      handleWebRtcTransport(socket, isConsumer, callback)
  );

  socket.on("disconnect", () => {
    logger.info("Socket disconnected [socketId:%s]", socket.id);
  });
}

async function handleJoinRoom(
  socket: Socket,
  meetingId: string,
  callback: JoinRoomAckCallback
): Promise<void> {
  logger.info("Joining room [roomId:%s]", meetingId);

  const router: Router =
    routers.get(meetingId) && rooms.get(meetingId)
      ? routers.get(meetingId)
      : await createRoom(meetingId);

  if (rooms.get(meetingId)) {
    const userExists: boolean = rooms
      .get(meetingId)
      .sockets.some((existingUser: Socket) => existingUser.id === socket.id);

    if (!userExists) {
      // Add the user socket to the sockets array
      socket.join(meetingId);
      rooms.get(meetingId).sockets.push(socket);
      peers.set(socket.id, {
        id: socket.id,
        socketId: socket.id,
        meetingId,
        routerId: router.id,
        transports: [],
        producers: [],
        consumers: [],
      });

      // Notify other users that a new user has connected
      socket
        .to(meetingId)
        .emit("user-connected", { socketId: socket.id, meetingId });
    }
  }

  const rtpCapabilities: any = router.rtpCapabilities;

  // logger.info("RTP Capabilities: %o", rtpCapabilities);

  // logger.info("Routers: %o", global.routers);
  // logger.info("Rooms: %o", global.rooms);

  callback(rtpCapabilities);
}

async function createRoom(roomId: string) {
  const router = await worker.createRouter({
    mediaCodecs: mediasoupConfig.routerOptions.mediaCodecs,
  });

  const room: Room = {
    id: roomId,
    sockets: [],
    router: router.id,
  };

  routers.set(roomId, router);
  rooms.set(roomId, room);

  return router;
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

  const router: Router = routers.get(peer.meetingId);

  if (!router) {
    logger.error("Router not found [roomId:%s]", peer.meetingId);
    return;
  }

  const webRtcTransport = await router.createWebRtcTransport({
    webRtcServer: worker.appData.webRtcServer,
    ...mediasoupConfig.webRtcTransportOptions,
  } as WebRtcTransportOptions);

  if (isConsumer) {
    peer.consumers.push(webRtcTransport.id);
  } else {
    peer.producers.push(webRtcTransport.id);
  }

  const params = {
    id: webRtcTransport.id,
    iceParameters: webRtcTransport.iceParameters,
    iceCandidates: webRtcTransport.iceCandidates,
    dtlsParameters: webRtcTransport.dtlsParameters,
  };

  callback(params);
}

export { handleSocketEvents };
