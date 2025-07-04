import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { Item, UserInput } from '../types';

/**
 * Create a new order. If the user does not exist, create a new user record first.
 * @param req - Express request with body containing user data and items array
 * @param res - Express response
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    // Destructure and type-assert incoming payload
    const { user: userData, items }: { user: UserInput; items: Item[] } = req.body;

    // Lookup existing user by email
    let user = await User.findOne({ email: userData.email });

    // Create new user if not found
    if (!user) {
      user = await User.create(userData);
    }

    // Create order referencing the user's ObjectId
    const order = await Order.create({ user: user._id, items });

    // Return created status with order ID
    return res.status(201).json({ message: 'Order placed successfully', orderId: order._id });

  } catch (err) {
    // Log the error for debugging
    console.error('Error in createOrder:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Retrieve all orders for a given user email.
 * @param req - Express request with email param
 * @param res - Express response
 */
export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    // Ensure the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all orders for the user's ObjectId
    const orders = await Order.find({ user: user._id });
    return res.json(orders);
  } catch (err) {
    console.error('Error in getOrdersByEmail:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Update user information fields based on email lookup.
 * @param req - Express request with email param and body containing update fields
 * @param res - Express response
 */
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { firstName, lastName, address } = req.body;

    // Find and update user atomically, returning the new document
    const user = await User.findOneAndUpdate(
      { email },
      { firstName, lastName, address },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Error in updateUserInfo:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Retrieve all users in the system. Use with caution for large datasets.
 * @param req - Express request
 * @param res - Express response
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: 'Retrieved all users', users });
  } catch (err) {
    console.error('Error in getAllUsers:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
