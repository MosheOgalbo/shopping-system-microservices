import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { orderSchema } from '../validation/order.schema';

export const createOrder = async (req: Request, res: Response) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'הבקשה אינה תקינה',
      details: parsed.error.flatten(),
    });
  }

  const { user: userData, items } = parsed.data;

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
    items,
    status: 'created',
  });

  return res.status(201).json({
    id: order._id.toString(),
    status: 'created',
  });
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  const email = req.params.email?.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const orders = await Order.find({ user: user._id }).lean();
  return res.json(orders.map(order => ({
    id: order._id.toString(),
    status: order.status,
    items: order.items,
    createdAt: order.createdAt,
  })));
};
