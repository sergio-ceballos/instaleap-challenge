import http from "http";
import app from "./app";
import { PORT } from "./config/environment";
import { logger } from "./logs/logger";

const SERVER_PORT = PORT;

const server = http.createServer(app);

server.listen(SERVER_PORT, () => {
  logger.info(`Server running at port ${SERVER_PORT}`);
});
