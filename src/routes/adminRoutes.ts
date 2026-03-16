import express from 'express';
import { authAdmin, registerAdmin, getAdminProfile } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
// router.post('/register', protectAdmin, registerAdmin); // Initially keeping un-protected to create first admin via API testing
router.post('/register', registerAdmin);
router.get('/me', protectAdmin, getAdminProfile);

export default router;
