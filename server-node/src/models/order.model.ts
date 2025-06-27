import { Schema, model, Types } from 'mongoose';

const orderSchema = new Schema({
  user:      { type: Types.ObjectId, ref: 'User', required: true },
  items:     [{
  productId: { type: String, required: true, trim: true },
  name:      { type: String, required: true, trim: true },
  quantity:  { type: String, required: true, min: [1, 'Quantity must be at least 1'] }
  }],
  createdAt: { type: Date, default: Date.now }
});

export const Order = model('Order', orderSchema);
