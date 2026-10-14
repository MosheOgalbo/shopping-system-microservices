import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from './index';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const collection of Object.values(collections)) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongo) {
    await mongo.stop();
  }
});

const app = createApp();

const payload = {
  user: {
    firstName: 'יוסי',
    lastName: 'לוי',
    email: 'yossi@example.com',
    address: 'ויצמן 5, חיפה',
  },
  items: [
    { productId: '1', name: 'לפטופ Dell', quantity: 1, price: 2999.99 },
    { productId: '5', name: 'ספר תכנות', quantity: 2, price: 149.99 },
  ],
};

describe('orders API', () => {
  it('reports health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('stores an order and returns its id', async () => {
    const created = await request(app).post('/api/orders').send(payload);
    expect(created.status).toBe(201);
    expect(created.body.status).toBe('created');
    expect(typeof created.body.id).toBe('string');
    expect(created.body.id.length).toBeGreaterThan(0);

    const stored = await request(app).get('/api/orders/yossi@example.com');
    expect(stored.status).toBe(200);
    expect(stored.body).toHaveLength(1);
    expect(stored.body[0].id).toBe(created.body.id);
    expect(stored.body[0].items).toEqual([
      { productId: '1', name: 'לפטופ Dell', quantity: 1, price: 2999.99 },
      { productId: '5', name: 'ספר תכנות', quantity: 2, price: 149.99 },
    ]);
  });

  it('rejects an invalid order without saving it', async () => {
    const response = await request(app).post('/api/orders').send({
      user: { firstName: 'א', lastName: 'לוי', email: 'bad', address: 'קצר' },
      items: [],
    });

    expect(response.status).toBe(400);
    const stored = await request(app).get('/api/orders/bad');
    expect(stored.status).toBe(404);
  });
});
