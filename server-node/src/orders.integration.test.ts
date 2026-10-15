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
  process.env.NODE_ENV = 'test';
  global.fetch = jest.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    expect(url).toContain('/Products?ids=');
    return {
      ok: true,
      json: async () => ([
        { id: 1, name: 'לפטופ Dell', price: 2999.99 },
        { id: 5, name: 'ספר תכנות', price: 149.99 },
        { id: 3, name: 'חולצה כחולה', price: 89.99 },
      ]),
    };
  }) as unknown as typeof fetch;

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
    { productId: '1', quantity: 1 },
    { productId: '5', quantity: 2 },
  ],
};

describe('orders API', () => {
  it('reports health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('stores an order with a customer snapshot and catalog prices', async () => {
    const created = await request(app).post('/api/orders').send(payload);
    expect(created.status).toBe(201);
    expect(created.body.status).toBe('created');
    expect(typeof created.body.id).toBe('string');

    const stored = await Order.findById(created.body.id).lean();
    expect(stored?.customer).toMatchObject(payload.user);
    expect(stored?.items).toEqual([
      { productId: '1', name: 'לפטופ Dell', quantity: 1, price: 2999.99 },
      { productId: '5', name: 'ספר תכנות', quantity: 2, price: 149.99 },
    ]);
  });

  it('keeps the original address on an older order when the same email orders again', async () => {
    const first = await request(app).post('/api/orders').send(payload);
    expect(first.status).toBe(201);

    const second = await request(app).post('/api/orders').send({
      user: {
        ...payload.user,
        firstName: 'יוסף',
        address: 'הרצל 10, תל אביב',
      },
      items: [{ productId: '3', quantity: 1 }],
    });
    expect(second.status).toBe(201);

    const users = await User.find({ email: 'yossi@example.com' }).lean();
    expect(users).toHaveLength(1);
    expect(users[0].address).toBe('הרצל 10, תל אביב');

    const firstStored = await Order.findById(first.body.id).lean();
    expect(firstStored?.customer.address).toBe('ויצמן 5, חיפה');
    expect(firstStored?.customer.firstName).toBe('יוסי');
  });

  it('returns the same order for a repeated idempotency key', async () => {
    const first = await request(app)
      .post('/api/orders')
      .set('Idempotency-Key', 'order-1')
      .send(payload);
    const second = await request(app)
      .post('/api/orders')
      .set('Idempotency-Key', 'order-1')
      .send(payload);

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(second.body.id).toBe(first.body.id);
    expect(await Order.countDocuments()).toBe(1);
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
      items: [{ productId: '999', quantity: 1 }],
    });

    expect(response.status).toBe(400);
    expect(await Order.countDocuments()).toBe(0);
  });

  it('does not expose order lookup by email', async () => {
    const response = await request(app).get('/api/orders/yossi@example.com');
    expect(response.status).toBe(404);
  });
});
