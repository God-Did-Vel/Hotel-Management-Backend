import { Request, Response } from 'express';
import PaymentMethod from '../models/PaymentMethod.js';

// @desc    Get all active payment methods (public/user)
// @route   GET /api/payment-methods
// @access  Public
export const getPaymentMethods = async (req: Request, res: Response) => {
    // If admin, return all. If user, return only active. Let's just return all for admin, active for guests.
    // For simplicity, we just return all right now and filter in UI, or check auth here.
    const query = req.baseUrl.includes('admin') ? {} : { isActive: true }; // Just getting active for now
    const methods = await PaymentMethod.find(req.user ? {} : { isActive: true }); // Simplified check
    res.json(methods);
};

// @desc    Get all payment methods (Admin)
// @route   GET /api/payment-methods/admin
// @access  Private/Admin
export const getAdminPaymentMethods = async (req: Request, res: Response) => {
    const methods = await PaymentMethod.find({});
    res.json(methods);
};

// @desc    Create a new payment method
// @route   POST /api/payment-methods
// @access  Private/Admin
export const createPaymentMethod = async (req: Request, res: Response) => {
    const { provider, details, isActive } = req.body;

    const method = new PaymentMethod({
        provider,
        details,
        isActive: isActive !== undefined ? isActive : true,
    });

    const createdMethod = await method.save();
    res.status(201).json(createdMethod);
};

// @desc    Delete a payment method
// @route   DELETE /api/payment-methods/:id
// @access  Private/Admin
export const deletePaymentMethod = async (req: Request, res: Response) => {
    const method = await PaymentMethod.findById(req.params.id);

    if (method) {
        await method.deleteOne();
        res.json({ message: 'Payment method removed' });
    } else {
        res.status(404);
        throw new Error('Payment method not found');
    }
};

// @desc    Toggle active status
// @route   PUT /api/payment-methods/:id
// @access  Private/Admin
export const updatePaymentMethod = async (req: Request, res: Response) => {
    const { provider, details, isActive } = req.body;
    const method = await PaymentMethod.findById(req.params.id);

    if (method) {
        method.provider = provider || method.provider;
        method.details = details || method.details;
        if (isActive !== undefined) {
            method.isActive = isActive;
        }

        const updatedMethod = await method.save();
        res.json(updatedMethod);
    } else {
        res.status(404);
        throw new Error('Payment method not found');
    }
};
