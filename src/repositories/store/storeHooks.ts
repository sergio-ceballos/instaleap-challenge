import { Types } from "mongoose";
import { QueryConditions } from "../../interfaces/IDao";
import { StoreQueryConditions } from "../../interfaces/IStore";

export const buildConditions = (conditions: Partial<StoreQueryConditions>) => {
  const queryConditions: QueryConditions = {};

  if (conditions.isOpen !== null && conditions.isOpen !== undefined) {
    queryConditions.isOpen = conditions.isOpen;
  }

  if (conditions.latitude) {
    queryConditions["coordinates.lat"] = conditions.latitude;
  }

  if (conditions.longitude) {
    queryConditions["coordinates.lng"] = conditions.longitude;
  }

  return queryConditions;
};
