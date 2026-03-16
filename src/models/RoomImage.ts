import mongoose from 'mongoose';

const roomImageSchema = new mongoose.Schema(
    {
        room_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        alt_text: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const RoomImage = mongoose.model('RoomImage', roomImageSchema);
export default RoomImage;
