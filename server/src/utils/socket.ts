import { Socket } from "socket.io";
import Logger from "./logger";

const logger = new Logger("socket");

function socketConnection() {
  const io = (global as any).io;
  const socket = io.of("/meeting");

  socket.on("connection", (socket: Socket) => {
    logger.info("Socket connected");
  });
}

export { socketConnection };
