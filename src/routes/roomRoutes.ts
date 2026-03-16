import express from 'express';
import {
    getRooms,
    getRoomBySlug,
    createRoom,
    updateRoom,
    deleteRoom,
} from '../controllers/roomController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getRooms).post(protectAdmin, createRoom);
router.route('/:slug').get(getRoomBySlug);
router.route('/:id').put(protectAdmin, updateRoom).delete(protectAdmin, deleteRoom);

export default router;
