import { Schema, model, Types } from 'mongoose';

const customerSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  address: { type: String, required: true, trim: true },
}, { _id: false });

const orderItemSchema = new Schema({
  productId: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1, max: 99 },
  price: { type: Number, required: true, min: 0 },
}, { _id: false });

const orderSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User' },
  customer: { type: customerSchema, required: true },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: [(value: unknown[]) => value.length > 0, 'Order must include products'],
  },
  status: { type: String, enum: ['created'], default: 'created', required: true },
  idempotencyKey: { type: String, unique: true, sparse: true, trim: true },
}, { timestamps: true });

export const Order = model('Order', orderSchema);
