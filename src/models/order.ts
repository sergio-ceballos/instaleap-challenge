import mongoose, { Schema, Document, Types } from 'mongoose';

enum OrderStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface IOrder extends Document {
  orderId: Types.ObjectId;
  origin: {
    address: string;
    coordinates: {
      lat: string;
      lng: string;
    };
  };
  destination: {
    storeId: Types.ObjectId;
    customerName: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  items: {
    productId: Types.ObjectId;
    productName: string;
    quantity: number;
  }[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    orderId: { type: Schema.Types.ObjectId, required: true, unique: true },
    origin: {
      address: { type: String, required: true },
      coordinates: {
        lat: { type: String, required: true },
        lng: { type: String, required: true },
      },
    },
    destination: {
      storeId: { type: Schema.Types.ObjectId },
      customerName: { type: String },
      address: { type: String },
      coordinates: {
        lat: { type: String },
        lng: { type: String },
      },
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ orderId: 1 }, { unique: true });

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;

