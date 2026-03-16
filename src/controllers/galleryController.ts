import { Request, Response } from 'express';
import Gallery from '../models/Gallery.js';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req: Request, res: Response) => {
    const gallery = await Gallery.find({});
    res.json(gallery);
};

// @desc    Add an image to gallery
// @route   POST /api/gallery
// @access  Private/Admin
export const addGalleryImage = async (req: Request, res: Response) => {
    const image = new Gallery({
        image_url: req.body.image_url,
        alt_text: req.body.alt_text,
        category: req.body.category,
    });

    const createdImage = await image.save();
    res.status(201).json(createdImage);
};

// @desc    Delete an image from gallery
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req: Request, res: Response) => {
    const image = await Gallery.findById(req.params.id);

    if (image) {
        await image.deleteOne();
        res.json({ message: 'Image removed' });
    } else {
        res.status(404);
        throw new Error('Image not found');
    }
};
