import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
    {
        image_url: {
            type: String,
            required: true,
        },
        alt_text: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            default: 'general',
        },
    },
    {
        timestamps: true,
    }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
