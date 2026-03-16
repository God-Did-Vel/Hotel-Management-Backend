import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-luxury-hotel-key-change-me-in-production';

export const generateToken = (userId: string, role: string) => {
    return jwt.sign({ id: userId, role }, JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
