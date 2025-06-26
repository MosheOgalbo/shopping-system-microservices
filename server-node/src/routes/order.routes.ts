import { Router } from 'express';
import { createOrder, getOrdersByEmail, updateUserInfo } from '../controllers/order.controller';

const router = Router();

router.post('/', (req, res, next) => {
  Promise.resolve(createOrder(req, res)).catch(next);
});

router.get('/:email', (req, res, next) => {
  Promise.resolve(getOrdersByEmail(req, res)).catch(next);
});

router.put('/:email', (req, res, next) => {
  Promise.resolve(updateUserInfo(req, res)).catch(next);
});

export default router;
