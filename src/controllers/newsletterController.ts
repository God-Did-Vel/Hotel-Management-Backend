import { Request, Response } from 'express';
import Newsletter from '../models/Newsletter.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribeNewsletter = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    const emailExists = await Newsletter.findOne({ email });

    if (emailExists) {
        res.status(400);
        throw new Error('Email already subscribed');
    }

    const subscriber = await Newsletter.create({ email });

    res.status(201).json(subscriber);
};

// @desc    Get all subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
export const getSubscribers = async (req: Request, res: Response) => {
    const subscribers = await Newsletter.find({});
    res.json(subscribers);
};
