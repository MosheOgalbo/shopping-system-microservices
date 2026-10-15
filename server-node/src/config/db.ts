import mongoose from 'mongoose';
import { requireEnv } from './env';

export const connectDB = async () => {
  const mongoUri = requireEnv('MONGO_URI');
  mongoose.set('autoIndex', process.env.NODE_ENV !== 'production');
  await mongoose.connect(mongoUri);
};
