import PaymentMethod from '../models/PaymentMethod.js';
// @desc    Get all active payment methods
// @route   GET /api/paymentmethods
// @access  Public
export const getPaymentMethods = async (req, res) => {
    try {
        const filter = req.query.all === 'true' ? {} : { isActive: true };
        const paymentMethods = await PaymentMethod.find(filter);
        res.json(paymentMethods);
    }
    catch (error) {
        console.error('Get payment methods error:', error);
        res.status(500).json({
            message: 'Server error getting payment methods',
        });
    }
};
// @desc    Create a new payment method
// @route   POST /api/paymentmethods
// @access  Private/Admin
export const createPaymentMethod = async (req, res) => {
    try {
        const { provider, bankName, accountNumber, accountName, details, isActive } = req.body;
        // Validation
        if (!provider) {
            res.status(400).json({
                message: 'Please provide provider (payment method name)',
            });
            return;
        }
        let finalDetails = details || '';
        if (!finalDetails && bankName && accountNumber) {
            finalDetails = `Bank Name: ${bankName}\nAccount Number: ${accountNumber}\nAccount Name: ${accountName || ''}`;
        }
        const paymentMethod = await PaymentMethod.create({
            provider,
            bankName: bankName || '',
            accountNumber: accountNumber || '',
            accountName: accountName || '',
            details: finalDetails,
            isActive: isActive !== false, // Default to true if not specified
        });
        res.status(201).json(paymentMethod);
    }
    catch (error) {
        console.error('Create payment method error:', error);
        res.status(500).json({
            message: 'Server error creating payment method',
        });
    }
};
// @desc    Update a payment method
// @route   PUT /api/paymentmethods/:id
// @access  Private/Admin
export const updatePaymentMethod = async (req, res) => {
    try {
        let paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            res.status(404).json({
                message: 'Payment method not found',
            });
            return;
        }
        paymentMethod.provider = req.body.provider || paymentMethod.provider;
        paymentMethod.bankName = req.body.bankName !== undefined ? req.body.bankName : paymentMethod.bankName;
        paymentMethod.accountNumber = req.body.accountNumber !== undefined ? req.body.accountNumber : paymentMethod.accountNumber;
        paymentMethod.accountName = req.body.accountName !== undefined ? req.body.accountName : paymentMethod.accountName;
        let finalDetails = req.body.details !== undefined ? req.body.details : paymentMethod.details;
        if (!finalDetails && paymentMethod.bankName && paymentMethod.accountNumber) {
            finalDetails = `Bank Name: ${paymentMethod.bankName}\nAccount Number: ${paymentMethod.accountNumber}\nAccount Name: ${paymentMethod.accountName || ''}`;
        }
        paymentMethod.details = finalDetails;
        paymentMethod.isActive = req.body.isActive !== undefined ? req.body.isActive : paymentMethod.isActive;
        const updatedPaymentMethod = await paymentMethod.save();
        res.json(updatedPaymentMethod);
    }
    catch (error) {
        console.error('Update payment method error:', error);
        res.status(500).json({
            message: 'Server error updating payment method',
        });
    }
};
// @desc    Delete a payment method
// @route   DELETE /api/paymentmethods/:id
// @access  Private/Admin
export const deletePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            res.status(404).json({
                message: 'Payment method not found',
            });
            return;
        }
        await PaymentMethod.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Payment method deleted successfully',
        });
    }
    catch (error) {
        console.error('Delete payment method error:', error);
        res.status(500).json({
            message: 'Server error deleting payment method',
        });
    }
};
//# sourceMappingURL=paymentMethodController.js.map