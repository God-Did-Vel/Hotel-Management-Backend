import mongoose from 'mongoose';
declare const Room: mongoose.Model<{
    name: string;
    description: string;
    slug: string;
    price_per_night: number;
    max_guests: number;
    room_size: string;
    bed_type: string;
    amenities: string[];
    availability_status: boolean;
    featured: boolean;
    location: "Benin" | "Ore";
    room_type: "Room" | "Suite";
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    slug: string;
    price_per_night: number;
    max_guests: number;
    room_size: string;
    bed_type: string;
    amenities: string[];
    availability_status: boolean;
    featured: boolean;
    location: "Benin" | "Ore";
    room_type: "Room" | "Suite";
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    name: string;
    description: string;
    slug: string;
    price_per_night: number;
    max_guests: number;
    room_size: string;
    bed_type: string;
    amenities: string[];
    availability_status: boolean;
    featured: boolean;
    location: "Benin" | "Ore";
    room_type: "Room" | "Suite";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    description: string;
    slug: string;
    price_per_night: number;
    max_guests: number;
    room_size: string;
    bed_type: string;
    amenities: string[];
    availability_status: boolean;
    featured: boolean;
    location: "Benin" | "Ore";
    room_type: "Room" | "Suite";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    description: string;
    slug: string;
    price_per_night: number;
    max_guests: number;
    room_size: string;
    bed_type: string;
    amenities: string[];
    availability_status: boolean;
    featured: boolean;
    location: "Benin" | "Ore";
    room_type: "Room" | "Suite";
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & mongoose.FlatRecord<{
    name: string;
    description: string;
    slug: string;
    price_per_night: number;
    max_guests: number;
    room_size: string;
    bed_type: string;
    amenities: string[];
    availability_status: boolean;
    featured: boolean;
    location: "Benin" | "Ore";
    room_type: "Room" | "Suite";
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Room;
//# sourceMappingURL=Room.d.ts.map