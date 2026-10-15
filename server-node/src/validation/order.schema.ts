import { z } from 'zod';

const namePattern = /^(?=.*\p{L})[\p{L}\s'-]+$/u;
const addressPattern = /^(?=.*[\p{L}\p{N}])[\p{L}\p{N}\s,.'#/’-]+$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

export const orderSchema = z.object({
  user: z.object({
    firstName: z.string().trim().min(2).max(50).regex(namePattern),
    lastName: z.string().trim().min(2).max(50).regex(namePattern),
    email: z.string().trim().max(200).regex(emailPattern).transform(value => value.toLowerCase()),
    address: z.string().trim().min(5).max(300).regex(addressPattern),
  }).strict(),
  items: z.array(z.object({
    productId: z.string().trim().min(1).max(100),
    name: z.string().trim().min(1).max(200),
    quantity: z.number().int().min(1).max(99),
    price: z.number().nonnegative().finite().max(1_000_000).optional(),
  }).strict()).min(1).max(100),
}).strict();

export type OrderPayload = z.infer<typeof orderSchema>;
