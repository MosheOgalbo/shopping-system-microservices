import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from './index';
import { Order } from './models/order.model';
import { User } from './models/user.model';

let mongo: MongoMemoryServer;
const originalFetch = global.fetch;
const originalCatalogUrl = process.env.CATALOG_API_URL;

beforeAll(async () => {
  process.env.CATALOG_API_URL = 'http://catalog.test/api';
  global.fetch = jest.fn(async () => ({
    ok: true,
    json: async () => ([
      { Id: 1, Name: 'לפטופ Dell', Price: 2999.99 },
      { Id: 5, Name: 'ספר תכנות', Price: 149.99 },
      { Id: 3, Name: 'חולצה כחולה', Price: 89.99 },
    ]),
  })) as unknown as typeof fetch;

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
  global.fetch = originalFetch;
  if (originalCatalogUrl === undefined) {
    delete process.env.CATALOG_API_URL;
  } else {
    process.env.CATALOG_API_URL = originalCatalogUrl;
  }
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
    { productId: '1', name: 'fake laptop', quantity: 1, price: 1 },
    { productId: '5', name: 'fake book', quantity: 2, price: 2 },
  ],
};

describe('orders API', () => {
  it('reports health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('stores an order with catalog-authoritative item data', async () => {
    const created = await request(app).post('/api/orders').send(payload);
    expect(created.status).toBe(201);
    expect(created.body.status).toBe('created');
    expect(typeof created.body.id).toBe('string');

    const user = await User.findOne({ email: 'yossi@example.com' }).lean();
    expect(user?.firstName).toBe('יוסי');

    const stored = await Order.findById(created.body.id).lean();
    expect(stored?.items).toEqual([
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
    expect(await Order.countDocuments()).toBe(0);
  });

  it('rejects unknown product ids', async () => {
    const response = await request(app).post('/api/orders').send({
      user: { ...payload.user, email: 'unknown@example.com' },
      items: [{ productId: '999', name: 'ghost', quantity: 1, price: 10 }],
    });

    expect(response.status).toBe(400);
    expect(await Order.countDocuments()).toBe(0);
  });

  it('does not expose order lookup by email', async () => {
    const response = await request(app).get('/api/orders/yossi@example.com');
    expect(response.status).toBe(404);
  });
});
