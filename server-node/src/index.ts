import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db';
import orderRoutes from './routes/order.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

dotenv.config();

export function createApp() {
  const app = express();
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.json({ limit: '100kb' }));

  const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  const allowAnyOrigin = corsOrigins.length === 1 && corsOrigins[0] === '*';
  app.use(cors({
    origin: allowAnyOrigin ? true : corsOrigins,
    credentials: !allowAnyOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Idempotency-Key'],
  }));

  if (process.env.NODE_ENV !== 'test') {
    app.use('/api/orders', rateLimit({
      windowMs: 60_000,
      limit: 30,
      standardHeaders: true,
      legacyHeaders: false,
    }));
  }

  if (process.env.NODE_ENV === 'development') {
    const swaggerOptions = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Shopping App Orders API',
          version: '1.0.0',
          description: 'Order API for the shopping application',
        },
        servers: [{ url: process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 5001}` }],
      },
      apis: ['./src/routes/*.ts'],
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));
  }

  app.get('/health', async (_req, res) => {
    if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      res.status(503).json({ status: 'unavailable' });
      return;
    }

    try {
      await mongoose.connection.db.admin().ping();
      res.json({ status: 'ok' });
    } catch {
      res.status(503).json({ status: 'unavailable' });
    }
  });

  app.get('/healthz', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/orders', orderRoutes);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error', err);
    res.status(500).json({ error: 'Server error' });
  });

  return app;
}

export async function start() {
  const port = Number(process.env.PORT || 5001);
  await connectDB();
  const app = createApp();
  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  const shutdown = async () => {
    server.close();
    await mongoose.disconnect();
    process.exit(0);
  };

  process.on('SIGTERM', () => {
    void shutdown();
  });
  process.on('SIGINT', () => {
    void shutdown();
  });
}

if (require.main === module) {
  start().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
