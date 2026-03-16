import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            required: true,
            // e.g "Bank Transfer", "Bitcoin", "PayPal"
        },
        details: {
            type: String,
            required: true,
            // e.g "Account Number: 1234567890\nBank: Chase"
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
export default PaymentMethod;
