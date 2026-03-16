import express from 'express';
import { subscribeNewsletter, getSubscribers } from '../controllers/newsletterController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protectAdmin, getSubscribers);
router.post('/subscribe', subscribeNewsletter);

export default router;
