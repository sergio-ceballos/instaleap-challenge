import { Types } from "mongoose";
import { QueryConditions } from "../../interfaces/IDao";
import { UserQueryConditions } from "../../interfaces/IUser";

export const buildConditions = (conditions: Partial<UserQueryConditions>) => {
  const queryConditions: QueryConditions = {};

  if (conditions.userId) {
    queryConditions.userId = new Types.ObjectId(conditions.userId);
  }

  if (conditions.username) {
    queryConditions.username = conditions.username;
  }

  if (conditions.email) {
    queryConditions.email = conditions.email;
  }

  if (conditions.password) {
    queryConditions.password = conditions.password;
  }

  return queryConditions;
};
