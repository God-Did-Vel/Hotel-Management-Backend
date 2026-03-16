import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        price_per_night: {
            type: Number,
            required: true,
        },
        max_guests: {
            type: Number,
            required: true,
        },
        room_size: {
            type: String,
            required: true,
        },
        bed_type: {
            type: String,
            required: true,
        },
        amenities: [
            {
                type: String,
            },
        ],
        availability_status: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
