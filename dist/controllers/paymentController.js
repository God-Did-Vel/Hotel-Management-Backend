import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
// @desc    Get all payments
// @route   GET /api/payments
// @access  Private/Admin
export const getPayments = async (req, res) => {
    const payments = await Payment.find({})
        .populate({
        path: 'booking_id',
        populate: {
            path: 'user_id',
            select: 'name email'
        }
    });
    res.json(payments);
};
// @desc    Update payment status
// @route   PUT /api/payments/:id
// @access  Private/Admin
export const updatePaymentStatus = async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    if (payment) {
        payment.status = req.body.status || payment.status;
        if (req.body.status === 'paid') {
            const booking = await Booking.findById(payment.booking_id);
            if (booking) {
                booking.booking_status = 'confirmed';
                await booking.save();
            }
        }
        const updatedPayment = await payment.save();
        res.json(updatedPayment);
    }
    else {
        res.status(404);
        throw new Error('Payment not found');
    }
};
// @desc    Create payment intent / record
// @route   POST /api/payments
// @access  Public
export const createPayment = async (req, res) => {
    const { booking_id, amount, payment_method, receipt_url } = req.body;
    const payment = new Payment({
        booking_id,
        amount,
        payment_method,
        receipt_url,
        status: 'pending',
        payment_date: new Date(),
    });
    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
};
//# sourceMappingURL=paymentController.js.map