import { Request, Response } from 'express';
import SpaBooking from '../models/SpaBooking.js';

const generateTrackingCode = () => {
    return 'N&BSPA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// @desc    Create new spa booking
// @route   POST /api/spa/book
// @access  Public
export const createSpaBooking = async (req: Request, res: Response) => {
    const { guest_name, guest_email, guest_phone, booking_date, service_type } = req.body;

    let user_id;
    if (req.user) {
        user_id = req.user._id;
    }

    const spaBooking = new SpaBooking({
        guest_name,
        guest_email,
        guest_phone,
        user_id,
        booking_date,
        service_type,
        tracking_code: generateTrackingCode(),
    });

    const createdSpaBooking = await spaBooking.save();

    res.status(201).json({
        message: 'Your spot has been booked',
        tracking_code: createdSpaBooking.tracking_code,
        booking: createdSpaBooking
    });
};

// @desc    Get all spa bookings
// @route   GET /api/spa
// @access  Private/Admin
export const getSpaBookings = async (req: Request, res: Response) => {
    const bookings = await SpaBooking.find({});
    res.json(bookings);
};
