import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Mongo connection error:', err);
    process.exit(1);
  }
};
