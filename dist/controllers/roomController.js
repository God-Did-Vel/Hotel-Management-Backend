import Room from '../models/Room.js';
import RoomImage from '../models/RoomImage.js';
// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({}).sort({ createdAt: -1 }).lean();
        const roomIds = rooms.map(room => room._id);
        const allImages = await RoomImage.find({ room_id: { $in: roomIds } }).lean();
        const imageMap = {};
        allImages.forEach(img => {
            const rid = img.room_id.toString();
            if (!imageMap[rid]) {
                imageMap[rid] = [];
            }
            imageMap[rid].push(img.image_url);
        });
        for (const room of rooms) {
            const imgs = imageMap[room._id.toString()] || [];
            room.images = imgs;
            room.image = imgs.length > 0 ? imgs[0] : '/images/room-placeholder.jpg';
        }
        res.json(rooms);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching rooms' });
    }
};
// @desc    Fetch single room by slug
// @route   GET /api/rooms/:slug
// @access  Public
export const getRoomBySlug = async (req, res) => {
    try {
        const room = await Room.findOne({ slug: req.params.slug }).lean();
        if (room) {
            const roomImages = await RoomImage.find({ room_id: room._id });
            room.images = roomImages.map(img => img.image_url);
            room.image = roomImages.length > 0 && roomImages[0] ? roomImages[0].image_url : '/images/room-placeholder.jpg';
            res.json(room);
        }
        else {
            res.status(404).json({ message: 'Room not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching room' });
    }
};
// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
export const createRoom = async (req, res) => {
    try {
        const room = new Room({
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            price_per_night: req.body.price_per_night,
            max_guests: req.body.max_guests,
            room_size: req.body.room_size,
            bed_type: req.body.bed_type,
            amenities: req.body.amenities,
            availability_status: req.body.availability_status,
            featured: req.body.featured,
            location: req.body.location,
            room_type: req.body.room_type,
        });
        const createdRoom = await room.save();
        // If images array is provided, create RoomImage documents
        if (req.body.images && Array.isArray(req.body.images)) {
            for (const url of req.body.images) {
                if (url) {
                    await RoomImage.create({
                        room_id: createdRoom._id,
                        image_url: url,
                        alt_text: `Room image for ${createdRoom.name}`,
                    });
                }
            }
        }
        res.status(201).json(createdRoom);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Error creating room' });
    }
};
// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
export const updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (room) {
            room.name = req.body.name || room.name;
            room.slug = req.body.slug || room.slug;
            room.description = req.body.description || room.description;
            room.price_per_night = req.body.price_per_night || room.price_per_night;
            room.max_guests = req.body.max_guests || room.max_guests;
            room.room_size = req.body.room_size || room.room_size;
            room.bed_type = req.body.bed_type || room.bed_type;
            room.amenities = req.body.amenities || room.amenities;
            room.availability_status = req.body.availability_status !== undefined ? req.body.availability_status : room.availability_status;
            room.featured = req.body.featured !== undefined ? req.body.featured : room.featured;
            room.location = req.body.location || room.location;
            room.room_type = req.body.room_type || room.room_type;
            const updatedRoom = await room.save();
            // Sync images
            if (req.body.images && Array.isArray(req.body.images)) {
                // Delete old RoomImage documents for this room
                await RoomImage.deleteMany({ room_id: room._id });
                // Create new RoomImage documents
                for (const url of req.body.images) {
                    if (url) {
                        await RoomImage.create({
                            room_id: room._id,
                            image_url: url,
                            alt_text: `Room image for ${room.name}`,
                        });
                    }
                }
            }
            res.json(updatedRoom);
        }
        else {
            res.status(404).json({ message: 'Room not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Error updating room' });
    }
};
// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
export const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (room) {
            // Delete associated RoomImage documents first
            await RoomImage.deleteMany({ room_id: room._id });
            await room.deleteOne();
            res.json({ message: 'Room removed' });
        }
        else {
            res.status(404).json({ message: 'Room not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Error deleting room' });
    }
};
//# sourceMappingURL=roomController.js.map