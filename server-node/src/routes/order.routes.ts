import { Router } from 'express';
import { createOrder } from '../controllers/order.controller';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Invalid order
 */
router.post('/', (req, res, next) => {
  Promise.resolve(createOrder(req, res)).catch(next);
});

export default router;
