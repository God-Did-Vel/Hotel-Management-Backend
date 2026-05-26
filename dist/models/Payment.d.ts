import mongoose from 'mongoose';
declare const Payment: mongoose.Model<{
    booking_id: mongoose.Types.ObjectId;
    amount: number;
    status: "pending" | "paid" | "unpaid" | "flagged";
    payment_method: string;
    receipt_url?: string | null;
    payment_date?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    booking_id: mongoose.Types.ObjectId;
    amount: number;
    status: "pending" | "paid" | "unpaid" | "flagged";
    payment_method: string;
    receipt_url?: string | null;
    payment_date?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    booking_id: mongoose.Types.ObjectId;
    amount: number;
    status: "pending" | "paid" | "unpaid" | "flagged";
    payment_method: string;
    receipt_url?: string | null;
    payment_date?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    booking_id: mongoose.Types.ObjectId;
    amount: number;
    status: "pending" | "paid" | "unpaid" | "flagged";
    payment_method: string;
    receipt_url?: string | null;
    payment_date?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    booking_id: mongoose.Types.ObjectId;
    amount: number;
    status: "pending" | "paid" | "unpaid" | "flagged";
    payment_method: string;
    receipt_url?: string | null;
    payment_date?: NativeDate | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & mongoose.FlatRecord<{
    booking_id: mongoose.Types.ObjectId;
    amount: number;
    status: "pending" | "paid" | "unpaid" | "flagged";
    payment_method: string;
    receipt_url?: string | null;
    payment_date?: NativeDate | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Payment;
//# sourceMappingURL=Payment.d.ts.map