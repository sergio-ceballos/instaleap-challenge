import { Types } from "mongoose";

export const usersDummyData = [
  {
    userId: new Types.ObjectId(),
    username: "john_doe",
    email: "john.doe@example.com",
    password: "password123",
    profile: {
      firstName: "John",
      lastName: "Doe",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: new Types.ObjectId(),
    username: "jane_smith",
    email: "jane.smith@example.com",
    password: "securepass",
    profile: {
      firstName: "Jane",
      lastName: "Smith",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const storesDummyData = [
  {
    storeId: new Types.ObjectId(),
    name: "Supermercado Central",
    isOpen: true,
    address: "Calle 25B # 1-02, El Tesoro",
    coordinates: {
      lat: 6.1759,
      lng: -75.5780
    },
    nextDeliveryTime: {
      start: new Date("2024-12-02T09:00:00Z"),
      end: new Date("2024-12-02T11:00:00Z"),
    },
  },
  {
    storeId: new Types.ObjectId(),
    name: "MiniMarket Las Palmas",
    isOpen: false,
    address: "Carrera 43A # 1-65, El Poblado",
    coordinates: {
      lat: 6.1972,
      lng: -75.5710
    },
    nextDeliveryTime: {
      start: new Date("2024-12-02T10:00:00Z"),
      end: new Date("2024-12-02T10:30:00Z"),
    },
  },
  {
    storeId: new Types.ObjectId(),
    name: "Express Tienda 24H",
    isOpen: true,
    address: "Calle 50 # 63-49, San Diego",
    coordinates: {
      lat: 6.2597,
      lng: -75.5664
    },
    nextDeliveryTime: {
      start: new Date("2024-12-02T14:00:00Z"),
      end: new Date("2024-12-02T14:30:00Z"),
    },
  },
];

export const ordersDummyData = [
  {
    orderId: new Types.ObjectId(),
    origin: {
      address: "Carrera 52 #73-75, Parque Explora",
      coordinates: {
        lat: 6.2705,
        lng: -75.5672
      },
    },
    items: [
      {
        productId: new Types.ObjectId(),
        productName: "Manzanas",
        quantity: 10,
      },
      {
        productId: new Types.ObjectId(),
        productName: "Leche",
        quantity: 2,
      },
    ],
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    orderId: new Types.ObjectId(),
    origin: {
      address: "Calle 10 #37-18, Parque Lleras",
      coordinates: {
        lat: 6.2088,
        lng: -75.5672,
      },
    },
    items: [
      {
        productId: new Types.ObjectId(),
        productName: "Pan Integral",
        quantity: 5,
      },
      {
        productId: new Types.ObjectId(),
        productName: "Queso",
        quantity: 1,
      },
    ],
    status: "IN_TRANSIT",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
  