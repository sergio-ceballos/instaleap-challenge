import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { SECRET_KEY } from "../config/environment";
import GeneralError from "../errors/generalError";

export const isLoggedIn = (req: Request, res: Response, next: Function) => {
  const token = req.cookies.access_token;

  if (!token) {
    throw new GeneralError({
      message: "Access not authorized",
      status: 401,
    });
  }

  const data = jwt.verify(token, SECRET_KEY);

  if (!data) {
    throw new GeneralError({
      message: "Access not authorized",
      status: 401,
    });
  }

  return next();
};
