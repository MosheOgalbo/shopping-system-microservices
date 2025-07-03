import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import orderRoutes from './routes/order.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

const PORT = process.env.PORT || 5001;

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5001'],
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));



connectDB();

// הגדרת Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopping App API',
      version: '1.0.0',
      description: 'API documentation for the Shopping App',
    },
      servers: [{ url: 'http://localhost:5001' }]
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/orders', orderRoutes);

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
