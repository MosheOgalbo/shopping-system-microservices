import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { orderSchema, OrderPayload } from '../validation/order.schema';
import { authorizeOrderItems, fetchCatalogProducts } from '../services/catalog';
import { findRememberedOrder, rememberOrder } from '../services/idempotency';
import { requireEnv } from '../config/env';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: 'הבקשה אינה תקינה',
      details: parsed.error.flatten(),
    });
    return;
  }

  const idempotencyKey = headerValue(req, 'idempotency-key');
  if (idempotencyKey) {
    const remembered = findRememberedOrder(idempotencyKey);
    if (remembered) {
      res.status(201).json(remembered);
      return;
    }
  }

  let catalogBaseUrl: string;
  try {
    catalogBaseUrl = requireEnv('CATALOG_API_URL');
  } catch {
    res.status(500).json({ error: 'Catalog service is not configured' });
    return;
  }

  const { user: userData, items } = parsed.data;

  let authorizedItems;
  try {
    const catalogProducts = await fetchCatalogProducts(
      catalogBaseUrl,
      items.map(item => item.productId),
    );
    authorizedItems = authorizeOrderItems(items, catalogProducts);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Catalog validation failed';
    if (message.startsWith('Unknown productId')) {
      res.status(400).json({ error: 'מוצר בהזמנה אינו קיים בקטלוג' });
      return;
    }
    console.error('Catalog enrichment failed', err);
    res.status(502).json({ error: 'לא ניתן לאמת את המוצרים מול הקטלוג' });
    return;
  }

  let order;
  try {
    order = await Order.create({
      customer: userData,
      items: authorizedItems,
      status: 'created',
      idempotencyKey: idempotencyKey || undefined,
    });
  } catch (err: unknown) {
    const duplicate = typeof err === 'object' && err !== null && 'code' in err && (err as { code?: number }).code === 11000;
    if (duplicate && idempotencyKey) {
      const existing = await Order.findOne({ idempotencyKey });
      if (existing) {
        const body = { id: existing._id.toString(), status: existing.status };
        rememberOrder(idempotencyKey, body);
        res.status(201).json(body);
        return;
      }
    }
    throw err;
  }

  try {
    const user = await upsertUser(userData);
    await Order.updateOne({ _id: order._id }, { $set: { user: user._id } });
  } catch (err) {
    console.error('User upsert failed after order create', err);
  }

  const body = {
    id: order._id.toString(),
    status: 'created',
  };

  if (idempotencyKey) {
    rememberOrder(idempotencyKey, body);
  }

  res.status(201).json(body);
};

async function upsertUser(userData: OrderPayload['user']) {
  const email = userData.email.toLowerCase();
  let user = await User.findOne({ email });

  if (!user) {
    try {
      return await User.create({
        ...userData,
        email,
      });
    } catch (err: unknown) {
      const duplicate = typeof err === 'object' && err !== null && 'code' in err && (err as { code?: number }).code === 11000;
      if (!duplicate) {
        throw err;
      }
      user = await User.findOne({ email });
      if (!user) {
        throw err;
      }
    }
  }

  user.firstName = userData.firstName;
  user.lastName = userData.lastName;
  user.address = userData.address;
  await user.save();
  return user;
}

function headerValue(req: Request, name: string): string | undefined {
  const value = req.headers[name];
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }
  return undefined;
}
