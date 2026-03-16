import express from 'express';
import { getAmenities, createAmenity, deleteAmenity } from '../controllers/amenityController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAmenities).post(protectAdmin, createAmenity);
router.route('/:id').delete(protectAdmin, deleteAmenity);

export default router;
