import mongoose from 'mongoose';
const paymentMethodSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true,
        // e.g "Bank Transfer", "Bitcoin", "PayPal"
    },
    bankName: {
        type: String,
        required: false,
    },
    accountNumber: {
        type: String,
        required: false,
    },
    accountName: {
        type: String,
        required: false,
    },
    details: {
        type: String,
        required: false,
        default: '',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
export default PaymentMethod;
//# sourceMappingURL=PaymentMethod.js.map