import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

interface CustomJwtPayload {
    id: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            admin?: any;
            user?: any;
        }
    }
}

export const protectAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'hotel_management_super_secure_key_2026') as CustomJwtPayload;

            if (decoded.role !== 'admin') {
                res.status(401).json({ message: 'Not authorized as an admin' });
                return;
            }

            req.admin = await Admin.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
            return;
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return;
    }
};

export const protectUser = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'hotel_management_super_secure_key_2026') as CustomJwtPayload;

            if (decoded.role !== 'user') {
                res.status(401).json({ message: 'Not authorized as a user' });
                return;
            }

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
            return;
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return;
    }
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'hotel_management_super_secure_key_2026') as CustomJwtPayload;

            if (decoded.role === 'user') {
                req.user = await User.findById(decoded.id).select('-password');
            }
        } catch (error) {
            // Gracefully ignore error so guest checkout still functions
        }
    }

    next();
};
