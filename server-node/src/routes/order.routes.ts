import { Router } from 'express';
import { createOrder, getOrdersByEmail } from '../controllers/order.controller';

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

/**
 * @swagger
 * /api/orders/{email}:
 *   get:
 *     summary: Get orders by user email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders for the user
 */
router.get('/:email', (req, res, next) => {
  Promise.resolve(getOrdersByEmail(req, res)).catch(next);
});

export default router;
