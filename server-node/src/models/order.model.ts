import { Schema, model, Types } from 'mongoose';

const orderSchema = new Schema({
  user:      { type: Types.ObjectId, ref: 'User', required: true },
  items:     [{
    productId: String,
    name:     String,
    quantity: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

export const Order = model('Order', orderSchema);
