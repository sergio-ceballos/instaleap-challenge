import { IStore } from "../models/store";
import { getCache, setCache } from "../config/redis";
import { DistanceMatrixUtil } from "../utils/distanceMatrix";
import EntityNotFoundError from "../errors/entityNotFoundError";
import { OrderRepository } from "../repositories/order/orderRepository";
import { StoreRepository } from "../repositories/store/storeRepository";

export class StoreService {
  private orderRepository: OrderRepository;
  private storeRepository: StoreRepository;
  private distanceMatrixUtil: DistanceMatrixUtil;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.storeRepository = new StoreRepository();
    this.distanceMatrixUtil = new DistanceMatrixUtil();
  }

  async findNearestStore(orderId: string) {
    const key = `orderId - ${orderId}`;
    const cachedResponse = await getCache(key);
    
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }

    const order = await this.orderRepository.findOne({ orderId });

    if (!order) {
      throw new EntityNotFoundError({
        message: `Order with id ${orderId} was not found`,
        status: 404,
        code: "ERROR_NOT_FOUND",
      });
    }

    const stores = await this.storeRepository.findAllPaginated({ isOpen: true });

    if (!stores.length) {
      throw new EntityNotFoundError({
        message: `No stores found`,
        status: 404,
        code: "ERROR_NOT_FOUND",
      });
    }

    let destinations = "";

    stores.forEach((store, index) => {
      if (stores.length - 1 === index) {
        destinations += `${store.coordinates.lat},${store.coordinates.lng}`;
      } else {
        destinations += `${store.coordinates.lat},${store.coordinates.lng}|`;
      }
    });

    const distances = await this.distanceMatrixUtil.fetchDistanceMatrix({
      origins: `${order.origin.coordinates.lat},${order.origin.coordinates.lng}`,
      destinations,
    });

    if (!distances.data.rows) {
      throw new EntityNotFoundError({
        message: `The nearest store could not be found`,
        status: 404,
        code: "ERROR_NOT_FOUND",
      });
    }

    const flattenedArray = distances.data.rows.map((row: any) => row.elements).flat();
    const [shorterDistance] = flattenedArray.sort((a: any, b: any) => a.duration.value - b.duration.value);

    const nearestStore = await this.storeRepository.findOne({
      latitude: shorterDistance.destination.split(",")[0],
      longitude: shorterDistance.destination.split(",")[1],
    });

    await setCache(key, JSON.stringify(nearestStore));

    return nearestStore;
  }
}
