import { createClient, RedisClientType } from "redis";

import { logger } from "../logs/logger";
import { NODE_ENV } from "./environment";

const host = NODE_ENV === 'production' ? 'redis' : 'localhost';

let client: RedisClientType = createClient({
  url: `redis://${host}:6379`
});

const connectRedis = async () => {
  client
    .on("connect", () => logger.info("Redis connection established successfully"))
    .on("error", (err) => {
      logger.error(`Redis error: ${err}`);
    })
    .connect();
};

const getCache = (key: string) => {
  return client.get(key);
};

const setCache = (key: string, value: string | Buffer, expiration = 3600) => {
  return client.setEx(key, expiration, value);
};

export { connectRedis, getCache, setCache };
