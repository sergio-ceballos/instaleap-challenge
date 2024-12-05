import { RequestHandler } from "express";
import { StoreService } from "../services/storeService";

export class StoreController {
  findNearestStore: RequestHandler = async (req, res, next) => {
    const orderId = req.params.orderId;
    const storeService = new StoreService();
    const response = await storeService.findNearestStore(orderId);

    res.status(200).json(response);
  };
}
