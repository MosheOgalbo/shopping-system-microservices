import { z } from 'zod';
import { ADDRESS_PATTERN, EMAIL_PATTERN, NAME_PATTERN } from './patterns';

export const orderSchema = z.object({
  user: z.object({
    firstName: z.string().trim().min(2).max(50).regex(NAME_PATTERN),
    lastName: z.string().trim().min(2).max(50).regex(NAME_PATTERN),
    email: z.string().trim().max(200).regex(EMAIL_PATTERN).transform(value => value.toLowerCase()),
    address: z.string().trim().min(5).max(300).regex(ADDRESS_PATTERN),
  }).strict(),
  items: z.array(z.object({
    productId: z.string().trim().min(1).max(100),
    quantity: z.number().int().min(1).max(99),
  })).min(1).max(100),
}).strict();

export type OrderPayload = z.infer<typeof orderSchema>;
