import express from 'express';
import {
    getPaymentMethods,
    getAdminPaymentMethods,
    createPaymentMethod,
    deletePaymentMethod,
    updatePaymentMethod,
} from '../controllers/paymentMethodController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to get active payment methods
router.route('/').get(getPaymentMethods);

// Admin routes
router.route('/admin').get(protectAdmin, getAdminPaymentMethods);
router.route('/').post(protectAdmin, createPaymentMethod);
router.route('/:id').put(protectAdmin, updatePaymentMethod).delete(protectAdmin, deletePaymentMethod);

export default router;
