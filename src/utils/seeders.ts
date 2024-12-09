import mongoose from "mongoose";

import StoreModel from "../models/store";
import OrderModel from "../models/order";
import { ordersDummyData, storesDummyData, usersDummyData } from "./mocks";
import UserModel from "../models/user";
import { logger } from "../logs/logger";

export const initData = async () => {
  try {
    const [ userCount, storeCount, orderCount ] = await Promise.all([
      UserModel.countDocuments(),
      StoreModel.countDocuments(),
      OrderModel.countDocuments(),
    ]);

    if (userCount === 0) {
      UserModel.insertMany(usersDummyData);
    }

    if (storeCount === 0) {
      StoreModel.insertMany(storesDummyData);
    }

    if (orderCount === 0) {
      OrderModel.insertMany(ordersDummyData);
    }
  } catch (error) {
    logger.error("Error when init data:", error);
  }
};
