import { RequestHandler } from "express";
import { UserService } from "../services/userService";

export class UserController {
  login: RequestHandler = async (req, res, next) => {
    const userInfo = req.body;
    const userService = new UserService();
    const token = await userService.login(userInfo);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ token });
  };
}
