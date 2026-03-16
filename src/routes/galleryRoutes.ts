import express from 'express';
import { getGallery, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getGallery).post(protectAdmin, addGalleryImage);
router.route('/:id').delete(protectAdmin, deleteGalleryImage);

export default router;
