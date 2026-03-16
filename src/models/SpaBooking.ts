import mongoose from 'mongoose';

const spaBookingSchema = new mongoose.Schema(
    {
        guest_name: {
            type: String,
            required: true,
        },
        guest_email: {
            type: String,
            required: true,
        },
        guest_phone: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        booking_date: {
            type: Date,
            required: true,
        },
        tracking_code: {
            type: String,
            required: true,
            unique: true,
        },
        service_type: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const SpaBooking = mongoose.model('SpaBooking', spaBookingSchema);
export default SpaBooking;
