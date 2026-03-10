import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IDevice {
  deviceId: string;
  name: string;
  lastUsed: Date;
  userAgent?: string;
}

export interface INotifications {
  communication_emails: boolean;
  marketing_emails: boolean;
  social_emails: boolean;
  security_emails: boolean;
}

interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    verified: boolean;
    provider?: 'credentials' | 'google';
    phone_number: string;
    profile: string;
    created_at: Date;
    updated_at: Date;
    lastLogin?: Date;
    devices: IDevice[];
    loginAttempts: number;
    activeSession: true;
    resetToken?: string;
    isSuscritpionActive?: boolean;
    bio?: string;
    notifications?: INotifications;
}

const userSchema = new Schema<IUser>({
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        enum: ['credentials', 'google'],
        default: 'credentials',
        required: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    phone_number: {
        type: String,
        required: false
    },
    profile: {
        type: String,
        required: false
    },
    loginAttempts: {
        type: Number,
        required: false,
        default: 0
    },
    activeSession: {
        type: Boolean,
        required: false
    },
    resetToken: {
        type: String,
        required: false
    },
    lastLogin: {
        type: Date,
        required: false
    },
    devices: {
        type: [{
            deviceId: String,
            name: String,
            lastUsed: Date,
            userAgent: String
        }],
        default: [],
        required: false
    },
    isSuscritpionActive: {
        type: Boolean,
        required: false,
        default: false
    },
    bio: {
        type: String,
        required: false
    },
    notifications: {
        type: {
            communication_emails: { type: Boolean, default: false },
            marketing_emails: { type: Boolean, default: false },
            social_emails: { type: Boolean, default: true },
            security_emails: { type: Boolean, default: true },
        },
        required: false,
        default: () => ({
            communication_emails: false,
            marketing_emails: false,
            social_emails: true,
            security_emails: true,
        }),
    },
});
const UserModel = mongoose.models.User || model<IUser>('User', userSchema);
export { UserModel };

