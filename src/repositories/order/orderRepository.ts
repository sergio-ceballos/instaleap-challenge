import { DaoFn } from "../../interfaces/IDao";
import { OrderQueryConditions } from "../../interfaces/IOrder";
import OrderModel, { IOrder } from "../../models/order";
import { buildConditions } from "./orderHooks";

export class OrderRepository {
  async findOne(conditions: Partial<OrderQueryConditions>): Promise<IOrder | null> {
    const queryConditions = buildConditions(conditions);
    return OrderModel.findOne(queryConditions);
  };
}
