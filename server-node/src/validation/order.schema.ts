import { z } from 'zod';

const namePattern = /^[\p{L}\s'-]+$/u;

export const orderSchema = z.object({
  user: z.object({
    firstName: z.string().trim().min(2).max(50).regex(namePattern),
    lastName: z.string().trim().min(2).max(50).regex(namePattern),
    email: z.string().trim().email().max(200),
    address: z.string().trim().min(5).max(300),
  }),
  items: z.array(z.object({
    productId: z.string().trim().min(1).max(100),
    name: z.string().trim().min(1).max(200),
    quantity: z.number().int().min(1).max(99),
    price: z.number().nonnegative().max(1_000_000).optional(),
  })).min(1).max(100),
});

export type OrderPayload = z.infer<typeof orderSchema>;
