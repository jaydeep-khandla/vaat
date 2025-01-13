import { mediasoupConfig } from "../config";
import Logger from "../utils/logger";
import {
  Router,
  RtpObserver,
  WebRtcServer,
  WebRtcTransportOptions,
  Worker,
} from "mediasoup/node/lib/types";
import { Socket } from "socket.io";

const logger = new Logger("room");

const rooms = new Map<string, Room>();

global.rooms = rooms;

class Room {
  private _roomId: string;
  private _host: Socket;
  private _peers: Map<string, Socket> = new Map();
  private _webRtcServer: WebRtcServer;
  private _mediasoupRouter: Router;
  private _audioLevelObserver: RtpObserver;
  private _activeSpeakerObserver: RtpObserver;

  constructor(
    roomId: string,
    host: Socket,
    webRtcServer: WebRtcServer,
    mediasoupRouter: Router,
    audioLevelObserver: RtpObserver,
    activeSpeakerObserver: RtpObserver
  ) {
    this._roomId = roomId;

    this._host = host;

    this._peers.set(host.id, host);

    this._webRtcServer = webRtcServer;

    this._mediasoupRouter = mediasoupRouter;

    this._audioLevelObserver = audioLevelObserver;

    this._activeSpeakerObserver = activeSpeakerObserver;

    this._host.join(roomId);

    // this._host.to(roomId).emit("user-joined", roomId);
  }

  //   public get roomId() {
  //     return this._roomId;
  //   }

  public get mediasoupRouter() {
    return this._mediasoupRouter;
  }

  public get host() {
    return this._host;
  }

  public set host(host: Socket) {
    this._host = host;
  }

  public get peers() {
    return this._peers;
  }

  static async create(roomId: string, host: Socket) {
    // Router media Codecs.
    const { mediaCodecs } = mediasoupConfig.routerOptions;

    // Create a mediasoup Router; worker is a global variable.
    const mediasoupRouter = await worker.createRouter({ mediaCodecs });

    const { audioLevelObserverOptions, activeSpeakerObserverOptions } =
      mediasoupConfig;
    // Create an AudioLevelObserver.
    const audioLevelObserver = await mediasoupRouter.createAudioLevelObserver(
      audioLevelObserverOptions
    );

    // Create an ActiveSpeakerObserver.
    const activeSpeakerObserver =
      await mediasoupRouter.createActiveSpeakerObserver(
        activeSpeakerObserverOptions
      );

    return new Room(
      roomId,
      host,
      worker.appData.webRtcServer as WebRtcServer,
      mediasoupRouter,
      audioLevelObserver,
      activeSpeakerObserver
    );
  }

  close() {
    this._peers.forEach((peer) => {
      peer.leave(this._roomId);
    });

    this._host.leave(this._roomId);

    this._peers.clear();

    this._webRtcServer.close();

    this._audioLevelObserver.close();

    this._activeSpeakerObserver.close();

    this._mediasoupRouter.close();

    rooms.delete(this._roomId);
  }

  async createWebRtcTransport(socket: Socket, isConsumer: boolean) {
    const { webRtcTransportOptions } = mediasoupConfig;

    const peer = this._peers.get(socket.id);

    if (!peer) {
      logger.error("Peer not found [socketId:%s]", socket.id);
      return;
    }

    const webRtcTransport = await this._mediasoupRouter.createWebRtcTransport({
      webRtcServer: this._webRtcServer,
      ...webRtcTransportOptions,
      appData: {
        roomId: this._roomId,
        socketId: socket.id,
        isConsumer,
      },
    } as WebRtcTransportOptions);

    return webRtcTransport;
  }
}

export default Room;
