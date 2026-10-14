import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { orderSchema } from '../validation/order.schema';
import { authorizeOrderItems, fetchCatalogProducts } from '../services/catalog';

export const createOrder = async (req: Request, res: Response) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'הבקשה אינה תקינה',
      details: parsed.error.flatten(),
    });
  }

  const catalogBaseUrl = process.env.CATALOG_API_URL;
  if (!catalogBaseUrl) {
    return res.status(500).json({ error: 'Catalog service is not configured' });
  }

  const { user: userData, items } = parsed.data;

  let authorizedItems;
  try {
    const catalogProducts = await fetchCatalogProducts(catalogBaseUrl);
    authorizedItems = authorizeOrderItems(items, catalogProducts);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Catalog validation failed';
    if (message.startsWith('Unknown productId')) {
      return res.status(400).json({ error: 'מוצר בהזמנה אינו קיים בקטלוג' });
    }
    console.error('Catalog enrichment failed', err);
    return res.status(502).json({ error: 'לא ניתן לאמת את המוצרים מול הקטלוג' });
  }

  let user = await User.findOne({ email: userData.email.toLowerCase() });
  if (!user) {
    try {
      user = await User.create({
        ...userData,
        email: userData.email.toLowerCase(),
      });
    } catch (err: unknown) {
      const duplicate = typeof err === 'object' && err !== null && 'code' in err && (err as { code?: number }).code === 11000;
      if (!duplicate) {
        throw err;
      }
      user = await User.findOne({ email: userData.email.toLowerCase() });
      if (!user) {
        throw err;
      }
    }
  }

  const order = await Order.create({
    user: user._id,
    items: authorizedItems,
    status: 'created',
  });

  return res.status(201).json({
    id: order._id.toString(),
    status: 'created',
  });
};
