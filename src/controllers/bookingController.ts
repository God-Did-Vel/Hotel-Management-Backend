import { Request, Response } from 'express';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import RoomImage from '../models/RoomImage.js';
import PaymentMethod from '../models/PaymentMethod.js';
import Payment from '../models/Payment.js';
import { generateDynamicNigerianBankDetails } from '../utils/paymentGenerator.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req: Request, res: Response) => {
    const {
        guest_name,
        guest_email,
        guest_phone,
        room_id,
        check_in_date,
        check_out_date,
        number_of_guests,
        total_amount,
    } = req.body;

    let user_id = undefined;
    if (req.user) {
        // Attached if user is logged in via optionalAuth
        user_id = req.user._id;
    }

    const room = await Room.findById(room_id);
    if (!room) {
        res.status(404);
        throw new Error('Room not found');
    }

    const booking = new Booking({
        guest_name,
        guest_email,
        guest_phone,
        room_id,
        user_id,
        check_in_date,
        check_out_date,
        number_of_guests,
        total_amount,
        booking_status: 'pending',
    });
    const createdBooking = await booking.save();

    // Generate Bank Details using PaymentMethod config or fallback to generator
    let paymentDetails;
    const paymentMethods = await PaymentMethod.find({ isActive: true });
    
    if (paymentMethods && paymentMethods.length > 0 && paymentMethods[0]) {
        const selectedMethod = paymentMethods[0]; // Prefer the first active payment method or select one
        paymentDetails = {
            bankName: selectedMethod.bankName || selectedMethod.provider,
            accountNumber: selectedMethod.accountNumber || '',
            accountName: selectedMethod.accountName || '',
            instructions: selectedMethod.details
        };
    } else {
        paymentDetails = generateDynamicNigerianBankDetails();
    }

    res.status(201).json({
        booking: createdBooking,
        paymentDetails
    });
};

// @desc    Get all bookings (Admin view - includes user_id population)
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req: Request, res: Response) => {
    try {
        // FIXED: Populate both room_id AND user_id so admin sees user info
        const bookings = await Booking.find({})
            .populate('room_id', 'name slug price_per_night')
            .populate('user_id', 'name email')
            .sort({ createdAt: -1 });
        
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const { booking_status } = req.body;

        if (!booking_status) {
            res.status(400).json({ message: 'booking_status is required' });
            return;
        }

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            res.status(404).json({ message: 'Booking not found' });
            return;
        }

        // Update booking status
        booking.booking_status = booking_status;
        const updatedBooking = await booking.save();

        // Sync with Payment status
        if (booking_status === 'approved' || booking_status === 'confirmed') {
            // Find the associated payment and update its status to 'paid'
            const payment = await Payment.findOne({ booking_id: booking._id });
            if (payment) {
                payment.status = 'paid';
                await payment.save();
            } else {
                // Create a payment record if it doesn't exist
                await Payment.create({
                    booking_id: booking._id,
                    amount: booking.total_amount,
                    status: 'paid',
                    payment_method: 'bank_transfer',
                    payment_date: new Date()
                });
            }

            // Also make room unavailable if confirmed or approved
            const room = await Room.findById(booking.room_id);
            if (room) {
                room.availability_status = false;
                await room.save();
            }
        } else if (booking_status === 'cancelled') {
            // Mark payment as unpaid/cancelled
            const payment = await Payment.findOne({ booking_id: booking._id });
            if (payment) {
                payment.status = 'unpaid';
                await payment.save();
            }
            
            // Mark room as available again
            const room = await Room.findById(booking.room_id);
            if (room) {
                room.availability_status = true;
                await room.save();
            }
        }

        // Populate before sending response
        const populatedBooking = await Booking.findById(updatedBooking._id)
            .populate('room_id', 'name slug price_per_night')
            .populate('user_id', 'name email');

        res.json(populatedBooking);
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Error updating booking status' });
    }
};

// @desc    Get user's own bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req: Request, res: Response) => {
    try {
        // FIXED: req.user is set by the protectUser middleware
        const bookings = await Booking.find({ user_id: req.user._id })
            .populate('room_id', 'name slug price_per_night description location room_type')
            .sort({ createdAt: -1 })
            .lean();

        // Gather unique room IDs and booking IDs
        const roomIds = bookings.map(b => b.room_id?._id).filter(Boolean);
        const bookingIds = bookings.map(b => b._id);

        // Fetch all room images and payments in bulk
        const [allImages, allPayments] = await Promise.all([
            RoomImage.find({ room_id: { $in: roomIds } }).lean(),
            Payment.find({ booking_id: { $in: bookingIds } }).lean()
        ]);

        // Map room images
        const imageMap: Record<string, string[]> = {};
        allImages.forEach(img => {
            const rid = img.room_id.toString();
            if (!imageMap[rid]) {
                imageMap[rid] = [];
            }
            imageMap[rid].push(img.image_url);
        });

        // Map payments
        const paymentMap: Record<string, any> = {};
        allPayments.forEach(p => {
            const bid = p.booking_id.toString();
            paymentMap[bid] = {
                _id: p._id,
                status: p.status,
                amount: p.amount,
                payment_method: p.payment_method,
                payment_date: p.payment_date,
            };
        });

        // Attach images and payments to bookings in memory
        for (const booking of bookings) {
            if (booking.room_id) {
                const rid = (booking.room_id as any)._id.toString();
                const imgs = imageMap[rid] || [];
                (booking.room_id as any).images = imgs;
                (booking.room_id as any).image = imgs.length > 0 ? imgs[0] : '/images/room-placeholder.jpg';
            }
            (booking as any).payment = paymentMap[booking._id.toString()] || null;
        }

        res.json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Error fetching your bookings' });
    }
};