import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { orderSchema, OrderPayload } from '../validation/order.schema';
import { authorizeOrderItems, fetchCatalogProducts } from '../services/catalog';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: 'הבקשה אינה תקינה',
      details: parsed.error.flatten(),
    });
    return;
  }

  const catalogBaseUrl = process.env.CATALOG_API_URL;
  if (!catalogBaseUrl) {
    res.status(500).json({ error: 'Catalog service is not configured' });
    return;
  }

  const { user: userData, items } = parsed.data;

  let authorizedItems;
  try {
    const catalogProducts = await fetchCatalogProducts(catalogBaseUrl);
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

  const user = await upsertUser(userData);

  const order = await Order.create({
    user: user._id,
    items: authorizedItems,
    status: 'created',
  });

  res.status(201).json({
    id: order._id.toString(),
    status: 'created',
  });
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
