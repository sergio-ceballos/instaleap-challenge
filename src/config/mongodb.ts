import mongoose from 'mongoose';

import { logger } from '../logs/logger';
import { initData } from '../utils/seeders';
import { INIT_DATA, MONGO_PASSWORD, MONGO_USER, NODE_ENV } from './environment';

const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUser = MONGO_USER;
    const mongoPassword = MONGO_PASSWORD;
    const host = NODE_ENV === 'production' ? 'mongo' : 'localhost';

    await mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@${host}:27017`, {
      dbName: 'instastoredb',
    });

    if (INIT_DATA) {
      await initData();
    }

    logger.info('MongoDB connection established successfully');
  } catch (error) {
    logger.error(`Error when conecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectMongoDB;
