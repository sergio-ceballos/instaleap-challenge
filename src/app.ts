import cors from "cors";
import cookieParser from "cookie-parser";
import responseTime from "response-time";
import express, { Response } from "express";

import apiV1 from "./v1/routes/routes";
import { connectRedis } from "./config/redis";
import connectMongoDB from "./config/mongodb";
import errorHandler from "./middlewares/errorHandler";
import { loggerFormat } from "./middlewares/loggerFormat";

const app = express();

connectMongoDB();
connectRedis();

app.use(cors());
app.use(responseTime());
app.use(express.json());
app.use(cookieParser());
app.use((_, res: Response, next: Function) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  return next();
});
app.use(loggerFormat);

app.use("/api/v1", apiV1);
app.use("/health-check", (_, res: Response) => {
  res.sendStatus(200);
});

app.use(errorHandler);

export default app;
