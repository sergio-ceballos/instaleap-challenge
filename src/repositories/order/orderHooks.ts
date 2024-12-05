import { Types } from "mongoose";
import { QueryConditions } from "../../interfaces/IDao";
import { OrderQueryConditions } from "../../interfaces/IOrder";

export const buildConditions = (conditions: Partial<OrderQueryConditions>) => {
  const queryConditions: QueryConditions = {};

  if (conditions.orderId) {
    queryConditions.orderId = new Types.ObjectId(conditions.orderId);
  }

  return queryConditions;
};
