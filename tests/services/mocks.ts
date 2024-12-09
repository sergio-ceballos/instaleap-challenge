import { Types } from "mongoose";

export const cachedStoreMock = { id: "123", name: "Cached Store" };

export const orderId = "67510e6081491f1c68934872";

export const mockOrder = {
    orderId: new Types.ObjectId(orderId),
    origin: {
      coordinates: { lat: "1.1234", lng: "-1.5678" },
    },
  };

export const mockStores = [
    { coordinates: { lat: "2.2345", lng: "-2.6789" } },
    { coordinates: { lat: "3.3456", lng: "-3.7890" } },
  ];

export const mockDistances = {
    data: {
      rows: [
        { elements: [{ duration: { value: 100 }, destination: "2.2345,-2.6789" }] },
        { elements: [{ duration: { value: 200 }, destination: "3.3456,-3.7890" }] },
      ],
    },
  };

export const mockNearestStore = { id: "123", name: "Nearest Store" };