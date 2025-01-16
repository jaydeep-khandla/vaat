// import Logger from "./logger";
import { initializeSocketEvents } from '../lib/socketEvents';
import { Socket } from 'socket.io';

// const logger = new Logger("socket");

function socketConnection() {
  const meetingNamespace = io.of('/meeting');

  meetingNamespace.on('connection', (socket: Socket) =>
    initializeSocketEvents(meetingNamespace, socket)
  );
}

export { socketConnection };
