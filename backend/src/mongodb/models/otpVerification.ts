import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

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

export const OtpVerification = model<IOtpVerification>('OtpVerification', otpVerificationSchema);