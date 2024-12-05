import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../utils/errorUtils";
import { APP_DEBUG } from "../config/environment";
import CustomError from "../errors/customError";

export default function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent || APP_DEBUG) {
    next(error);
    return;
  }

  if (error instanceof CustomError) {
    res.status(error.status).json({
      error: {
        message: error.message,
        status: error.status,
        code: error.code
      },
    });

    return;
  }

  res.status(500).json({
    error: {
      message: getErrorMessage(error) || "An error ocurred. Please view logs for more details",
      status: 500
    },
  });

  return;
}
