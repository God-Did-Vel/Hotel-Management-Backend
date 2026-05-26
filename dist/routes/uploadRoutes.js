import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { uploadToCloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// POST /api/upload
// Expects multipart/form-data with field name "image"
// Returns { url: "https://..." }
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            res.status(400).json({ message: 'No image file provided. Field name must be "image".' });
            return;
        }

        if (isCloudinaryConfigured) {
            const url = await uploadToCloudinary(file.buffer, 'hotel_management');
            if (!url) {
                res.status(500).json({ message: 'Cloudinary upload returned no URL.' });
                return;
            }
            res.status(200).json({ url });
            return;
        }

        // Local fallback when Cloudinary env vars are missing
        const uploadsDir = path.join(path.resolve(), 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const ext = file.originalname.split('.').pop() ?? 'jpg';
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        fs.writeFileSync(path.join(uploadsDir, filename), file.buffer);
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        res.status(200).json({ url: `${baseUrl}/uploads/${filename}` });

    } catch (error) {
        console.error('Upload route error:', error);
        const message = error instanceof Error ? error.message : 'Image upload failed.';
        res.status(500).json({ message });
    }
});

export default router;