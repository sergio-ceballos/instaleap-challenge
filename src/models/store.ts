import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStore extends Document {
  storeId: Types.ObjectId;
  name: string;
  isOpen: boolean;
  address: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  nextDeliveryTime: {
    start: Date;
    end: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const StoreSchema: Schema = new Schema({
  storeId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  isOpen: { type: Boolean, default: false },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  nextDeliveryTime: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


StoreSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });
StoreSchema.index({ isOpen: 1 });

const StoreModel = mongoose.model<IStore>('Store', StoreSchema);
export default StoreModel;
