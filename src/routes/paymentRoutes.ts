import express from 'express';
import { getPayments, updatePaymentStatus, createPayment } from '../controllers/paymentController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protectAdmin, getPayments).post(createPayment);
router.route('/:id').put(protectAdmin, updatePaymentStatus);

export default router;
