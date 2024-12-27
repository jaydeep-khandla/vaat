// import Logger from "./logger";
import { handleSocketEvents } from "../lib/socketEvents";
import { Socket } from "socket.io";

// const logger = new Logger("socket");

function socketConnection() {
  const meetingNamespace = io.of("/meeting");

  meetingNamespace.on("connection", (socket: Socket) =>
    handleSocketEvents(meetingNamespace, socket)
  );
}

export { socketConnection };
