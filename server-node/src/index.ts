import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import orderRoutes from './routes/order.routes';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
