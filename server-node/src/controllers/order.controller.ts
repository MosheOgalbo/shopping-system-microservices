import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { Item, UserInput } from '../types';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user: userData, items }: {
      user: UserInput,
      items: Item[]
    } = req.body;

    let user = await User.findOne({ email: userData.email });

    if (!user) {
      user = await User.create(userData);
    }

    const order = await Order.create({ user: user._id, items });
    return res.status(201).json({ message: 'Order placed successfully', orderId: order._id });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const orders = await Order.find({ user: user._id });
    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { firstName, lastName, address } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { firstName, lastName, address },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({ message: 'User updated', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json( {message: 'get all order users:', users});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
