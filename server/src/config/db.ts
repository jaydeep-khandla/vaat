import Logger from '../utils/logger';
import mongoose from 'mongoose';

const logger = new Logger('db');

const dbURI = process.env.MONGODB_URI as string;

export async function connectDB() {
  return mongoose
    .connect(dbURI)
    .then(function connectionSuccess() {
      logger.info('MongoDB connected successfully!');
    })
    .catch(function connectionError(error) {
      console.error('MongoDB connection error: ', error);
      return Promise.reject(error);
    });
}
