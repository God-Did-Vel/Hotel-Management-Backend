import mongoose from 'mongoose';
declare const PaymentMethod: mongoose.Model<{
    provider: string;
    isActive: boolean;
    bankName?: string | null;
    accountNumber?: string | null;
    accountName?: string | null;
    details?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    provider: string;
    isActive: boolean;
    bankName?: string | null;
    accountNumber?: string | null;
    accountName?: string | null;
    details?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    provider: string;
    isActive: boolean;
    bankName?: string | null;
    accountNumber?: string | null;
    accountName?: string | null;
    details?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    provider: string;
    isActive: boolean;
    bankName?: string | null;
    accountNumber?: string | null;
    accountName?: string | null;
    details?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    provider: string;
    isActive: boolean;
    bankName?: string | null;
    accountNumber?: string | null;
    accountName?: string | null;
    details?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & mongoose.FlatRecord<{
    provider: string;
    isActive: boolean;
    bankName?: string | null;
    accountNumber?: string | null;
    accountName?: string | null;
    details?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default PaymentMethod;
//# sourceMappingURL=PaymentMethod.d.ts.map