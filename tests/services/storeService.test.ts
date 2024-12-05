import { Types } from "mongoose";
import { AxiosResponse } from "axios";

import * as mocks from "./mocks";
import { IOrder } from "../../src/models/order";
import { IStore } from "../../src/models/store";
import * as redisConfig from "../../src/config/redis";
import { StoreService } from "../../src/services/storeService";
import { DistanceMatrixUtil } from "../../src/utils/distanceMatrix";
import EntityNotFoundError from "../../src/errors/entityNotFoundError";
import { OrderRepository } from "../../src/repositories/order/orderRepository";
import { StoreRepository } from "../../src/repositories/store/storeRepository";

jest.mock("../../src/config/redis");

describe("StoreService", () => {
  let storeService: StoreService;
  const { orderId } = mocks;

  beforeEach(() => {
    storeService = new StoreService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached store if available", async () => {
    const { cachedStoreMock } = mocks;

    const getCacheSpy = jest.spyOn(redisConfig, "getCache").mockResolvedValueOnce(JSON.stringify(cachedStoreMock));
    const findOneSpy = jest.spyOn(OrderRepository.prototype, "findOne");

    const result = await storeService.findNearestStore("67510e6081491f1c68934872");

    expect(getCacheSpy).toHaveBeenCalledWith("orderId - 67510e6081491f1c68934872");
    expect(findOneSpy).not.toHaveBeenCalled();
    expect(result).toEqual(cachedStoreMock);
  });

  it("should throw EntityNotFoundError if order does not exist", async () => {
    const getCacheSpy = jest.spyOn(redisConfig, "getCache").mockResolvedValueOnce(null);
    const findOneSpy = jest.spyOn(OrderRepository.prototype, "findOne").mockResolvedValueOnce(null);

    await expect(storeService.findNearestStore(orderId)).rejects.toThrow();

    expect(getCacheSpy).toHaveBeenCalledWith(`orderId - ${orderId}`);
    expect(findOneSpy).toHaveBeenCalledWith({ orderId });
  });

  it("should throw EntityNotFoundError if no stores are found", async () => {
    const getCacheSpy = jest.spyOn(redisConfig, "getCache").mockResolvedValueOnce(null);
    const findOneOrderSpy = jest
      .spyOn(OrderRepository.prototype, "findOne")
      .mockResolvedValueOnce({ orderId: new Types.ObjectId(orderId) } as IOrder);
    const findAllPaginatedStoresSpy = jest.spyOn(StoreRepository.prototype, "findAllPaginated").mockResolvedValueOnce([]);

    await expect(storeService.findNearestStore(orderId)).rejects.toThrow(EntityNotFoundError);

    expect(getCacheSpy).toHaveBeenCalledWith(`orderId - ${orderId}`);
    expect(findOneOrderSpy).toHaveBeenCalledWith({ orderId });
    expect(findAllPaginatedStoresSpy).toHaveBeenCalledWith({ isOpen: true });
  });

  it("should find the nearest store and cache the result", async () => {
    const { mockOrder, mockStores, mockDistances, mockNearestStore } = mocks;

    const getCacheSpy = jest.spyOn(redisConfig, "getCache").mockResolvedValueOnce(null);

    const findOneOrderSpy = jest
      .spyOn(OrderRepository.prototype, "findOne")
      .mockResolvedValueOnce(mockOrder as IOrder);

    const findAllPaginatedStoresSpy = jest
      .spyOn(StoreRepository.prototype, "findAllPaginated")
      .mockResolvedValueOnce(mockStores as IStore[]);

    const fetchDistanceMatrixSpy = jest
      .spyOn(DistanceMatrixUtil.prototype, "fetchDistanceMatrix")
      .mockResolvedValueOnce(mockDistances as AxiosResponse);

    const findOneStoreSpy = jest
      .spyOn(StoreRepository.prototype, "findOne")
      .mockResolvedValueOnce(mockNearestStore as IStore);

    const setCacheSpy = jest.spyOn(redisConfig, "setCache");

    const result = await storeService.findNearestStore(orderId);

    expect(getCacheSpy).toHaveBeenCalledWith(`orderId - ${orderId}`);
    expect(findOneOrderSpy).toHaveBeenCalledWith({ orderId });
    expect(findAllPaginatedStoresSpy).toHaveBeenCalledWith({ isOpen: true });
    expect(fetchDistanceMatrixSpy).toHaveBeenCalledWith({
        origins: "1.1234,-1.5678",
        destinations: "2.2345,-2.6789|3.3456,-3.7890",
    });
    expect(findOneStoreSpy).toHaveBeenCalledWith({
        latitude: "2.2345",
        longitude: "-2.6789",
    });
    expect(setCacheSpy).toHaveBeenCalledWith(`orderId - ${orderId}`, JSON.stringify(mockNearestStore));
    expect(result).toEqual(mockNearestStore);
  });
});
