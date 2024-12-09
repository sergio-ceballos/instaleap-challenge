import { DaoFn } from "../../interfaces/IDao";
import { buildConditions } from "./storeHooks";
import StoreModel, { IStore } from "../../models/store";
import { PAGINATION_LIMIT } from "../../config/environment";
import { StoreQueryConditions } from "../../interfaces/IStore";

export class StoreRepository {
  async findOne(conditions: Partial<StoreQueryConditions>): Promise<IStore | null> {
    const queryConditions = buildConditions(conditions);
    return StoreModel.findOne(queryConditions);
  }

  async findAllPaginated(conditions: Partial<StoreQueryConditions>): Promise<IStore[]> {
    const limit = PAGINATION_LIMIT;
    let page = 1;
    let hasMore = true;
    const allStores: IStore[] = [];

    const queryConditions = buildConditions(conditions);

    while (hasMore) {
      const stores = await StoreModel.find(queryConditions)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      allStores.push(...stores);

      if (stores.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allStores;
  };
}
