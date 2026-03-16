import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        icon: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Amenity = mongoose.model('Amenity', amenitySchema);
export default Amenity;
