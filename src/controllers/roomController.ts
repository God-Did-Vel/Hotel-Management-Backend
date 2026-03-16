import { Request, Response } from 'express';
import Room from '../models/Room.js';
import RoomImage from '../models/RoomImage.js';

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
export const getRooms = async (req: Request, res: Response) => {
    const rooms = await Room.find({});
    res.json(rooms);
};

// @desc    Fetch single room by slug
// @route   GET /api/rooms/:slug
// @access  Public
export const getRoomBySlug = async (req: Request, res: Response) => {
    const room = await Room.findOne({ slug: req.params.slug });
    if (room) {
        res.json(room);
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
export const createRoom = async (req: Request, res: Response) => {
    const room = new Room({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        price_per_night: req.body.price_per_night,
        max_guests: req.body.max_guests,
        room_size: req.body.room_size,
        bed_type: req.body.bed_type,
        amenities: req.body.amenities,
        availability_status: req.body.availability_status,
        featured: req.body.featured,
    });

    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
};

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
export const updateRoom = async (req: Request, res: Response) => {
    const room = await Room.findById(req.params.id);

    if (room) {
        room.name = req.body.name || room.name;
        room.slug = req.body.slug || room.slug;
        room.description = req.body.description || room.description;
        room.price_per_night = req.body.price_per_night || room.price_per_night;
        room.max_guests = req.body.max_guests || room.max_guests;
        room.room_size = req.body.room_size || room.room_size;
        room.bed_type = req.body.bed_type || room.bed_type;
        room.amenities = req.body.amenities || room.amenities;
        room.availability_status = req.body.availability_status !== undefined ? req.body.availability_status : room.availability_status;
        room.featured = req.body.featured !== undefined ? req.body.featured : room.featured;

        const updatedRoom = await room.save();
        res.json(updatedRoom);
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
export const deleteRoom = async (req: Request, res: Response) => {
    const room = await Room.findById(req.params.id);

    if (room) {
        await room.deleteOne();
        res.json({ message: 'Room removed' });
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
};
