import { Schema, model, Types } from 'mongoose';

const orderItemSchema = new Schema({
  productId: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1, max: 99 },
  price: { type: Number, min: 0 },
}, { _id: false });

const orderSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  items: { type: [orderItemSchema], required: true, validate: [(value: unknown[]) => value.length > 0, 'Order must include products'] },
  status: { type: String, default: 'created' },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model('Order', orderSchema);
