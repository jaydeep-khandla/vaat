import httpServer from "./app";

import Logger from "./utils/logger";
import { socketConnection } from "./utils/socket";

const logger = new Logger("server");

// Start the server
const port = 8000;
httpServer.listen(port, function serverListening() {
  logger.info(`Server started at http://localhost:${port}`);
  socketConnection();
});
