import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

interface IOtpVerification extends Document {
    email: string;
    otp: string;
    created_at: Date;
}
const otpVerificationSchema = new Schema<IOtpVerification>({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: "10m"
    }
});

const OtpVerification =  mongoose.models.OtpVerification || model<IOtpVerification>('OtpVerification', otpVerificationSchema);
export { OtpVerification }