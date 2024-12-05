import { Types } from "mongoose";

export declare type DaoFn<T, U = any> = (conditions: T) => Promise<U>;

export interface QueryConditions {
  [i: string]: string | string[] | Types.ObjectId | number | number[] | boolean;
}
