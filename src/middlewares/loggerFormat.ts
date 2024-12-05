import morgan from "morgan";

import { logger, loggerFile } from "../logs/logger";

const morganFormat = ":method :url :status :response-time ms";

let logFormat;

export const loggerFormat = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const [ method, url, status, responseTime ] = message.split(" ");

      const logObject = {
        method,
        url,
        status,
        responseTime,
      };

      logFormat = JSON.stringify(logObject); 

      logger.info(logFormat);
      loggerFile.info(logFormat);
    },
  },
});
