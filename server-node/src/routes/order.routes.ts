import { Router } from 'express';
import { createOrder, getAllUsers, getOrdersByEmail, updateUserInfo } from '../controllers/order.controller';

const router = Router();

/**
 * @swagger
 * /api/orders/{email}:
 *   put:
 *     summary: Update user information by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put('/:email', (req, res, next) => {
  Promise.resolve(updateUserInfo(req, res)).catch(next);
});

/**
 * @swagger
 * /api/orders/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', (req, res, next) => {
  Promise.resolve(getAllUsers(req, res)).catch(next);
});


/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   address:
 *                     type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *         description: List of orders for user
 */
router.get('/:email', (req, res, next) => {
  Promise.resolve(getOrdersByEmail(req, res)).catch(next);
});


export default router;
