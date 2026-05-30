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
        image: {
            type: String,
        },
        images: [
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
        location: {
            type: String,
            enum: ['Benin', 'Ore'],
            required: true,
            default: 'Benin',
        },
        room_type: {
            type: String,
            enum: ['Room', 'Suite'],
            required: true,
            default: 'Room',
        },
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
