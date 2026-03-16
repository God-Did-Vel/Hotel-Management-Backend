import { Request, Response } from 'express';
import Amenity from '../models/Amenity.js';

// @desc    Get all amenities
// @route   GET /api/amenities
// @access  Public
export const getAmenities = async (req: Request, res: Response) => {
    const amenities = await Amenity.find({});
    res.json(amenities);
};

// @desc    Create an amenity
// @route   POST /api/amenities
// @access  Private/Admin
export const createAmenity = async (req: Request, res: Response) => {
    const amenity = new Amenity({
        name: req.body.name,
        icon: req.body.icon,
        description: req.body.description,
    });

    const createdAmenity = await amenity.save();
    res.status(201).json(createdAmenity);
};

// @desc    Delete an amenity
// @route   DELETE /api/amenities/:id
// @access  Private/Admin
export const deleteAmenity = async (req: Request, res: Response) => {
    const amenity = await Amenity.findById(req.params.id);

    if (amenity) {
        await amenity.deleteOne();
        res.json({ message: 'Amenity removed' });
    } else {
        res.status(404);
        throw new Error('Amenity not found');
    }
};
