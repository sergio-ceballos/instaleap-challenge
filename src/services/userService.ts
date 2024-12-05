import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/user/userRepository";
import { IUser } from "../models/user";
import { SECRET_KEY } from "../config/environment";
import { UserCredentials } from "../interfaces/IUser";
import EntityNotFoundError from "../errors/entityNotFoundError";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(userCredentials: UserCredentials) {
    const user: IUser = await this.userRepository.findOne(userCredentials);

    if (!user) {
      throw new EntityNotFoundError({
        message: `User not found`,
        status: 404,
        code: "ERROR_NOT_FOUND",
      });
    }

    const token = jwt.sign(
      {
        id: user.userId,
        username: user.username,
        email: user.email,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}
