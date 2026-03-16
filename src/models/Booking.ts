import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
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
        room_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false, // In case of guest checkout without account
        },
        check_in_date: {
            type: Date,
            required: true,
        },
        check_out_date: {
            type: Date,
            required: true,
        },
        number_of_guests: {
            type: Number,
            required: true,
        },
        total_amount: {
            type: Number,
            required: true,
        },
        booking_status: {
            type: String,
            enum: ['pending', 'approved', 'cancelled', 'confirmed'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
