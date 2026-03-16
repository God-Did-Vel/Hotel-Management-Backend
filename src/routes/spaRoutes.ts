import express from 'express';
import { createSpaBooking, getSpaBookings } from '../controllers/spaController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protectAdmin, getSpaBookings);
router.post('/book', createSpaBooking);

export default router;
