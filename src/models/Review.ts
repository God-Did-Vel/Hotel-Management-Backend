import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
        is_approved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
