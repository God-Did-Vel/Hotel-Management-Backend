import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import adminRoutes from './routes/adminRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import spaRoutes from './routes/spaRoutes.js';
import paymentMethodRoutes from './routes/paymentMethodRoutes.js';
import roomImageRoutes from './routes/roomImage.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    "https://nbitalianhotel.com",
    "https://www.nbitalianhotel.com"
];
// Also allow the runtime FRONTEND_ORIGIN or FRONTEND_URL env var
if (process.env.FRONTEND_ORIGIN) {
    allowedOrigins.push(process.env.FRONTEND_ORIGIN.replace(/\/$/, ''));
}
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ''));
}

app.use(cors({ 
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g. mobile apps, curl) or if origin is explicitly allowed
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        // Allow any Vercel domain dynamically
        if (origin && origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    }, 
    credentials: true 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/paymentmethods', paymentMethodRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/spa', spaRoutes);
app.use('/api/roomimages', roomImageRoutes);
app.use('/api/upload', uploadRoutes);

// Static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error handling middleware (LAST)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});