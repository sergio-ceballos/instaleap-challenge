import UserModel from "../../models/user";
import { DaoFn } from "../../interfaces/IDao";
import { buildConditions } from "./userHooks";
import { UserQueryConditions } from "../../interfaces/IUser";

export class UserRepository {
  findOne: DaoFn<Partial<UserQueryConditions>> = async (conditions) => {
    const queryConditions = buildConditions(conditions);
    return UserModel.findOne(queryConditions);
  };
}
