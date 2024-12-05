import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  userId: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  profile?: {
    firstName?: string;
    lastName?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    profile: {
      firstName: { type: String },
      lastName: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
