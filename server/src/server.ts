import app from "./app";
import Logger from "./utils/logger";

const logger = new Logger("server");

// Start the server
const port = 8000;
app.listen(port, () => {
  // console.log(`Server started at http://localhost:${port}`);
  logger.info(`Server started at http://localhost:${port}`);
});
