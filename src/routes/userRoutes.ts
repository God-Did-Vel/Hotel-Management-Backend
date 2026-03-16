import express from 'express';
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
} from '../controllers/userController.js';
import { protectUser, protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protectAdmin, getUsers);
router.post('/login', authUser);
router
    .route('/profile')
    .get(protectUser, getUserProfile)
    .put(protectUser, updateUserProfile);

export default router;
