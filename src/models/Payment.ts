import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        booking_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['paid', 'pending', 'unpaid', 'flagged'],
            default: 'pending',
        },
        payment_method: {
            type: String,
            default: 'bank_transfer',
        },
        receipt_url: {
            type: String, // Cloudinary URL or local file path
        },
        payment_date: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
