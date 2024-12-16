import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    verified: boolean;
    phone_number: string;
    profile: string;
    created_at: Date;
    updated_at: Date;
    loginAttempts: number;
    activeSession: true;
    resetToken?: string;
    isSuscritpionActive?: boolean;
    bio?:string
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
        required: true
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
    isSuscritpionActive: {
        type: Boolean,
        required: false,
        default: false
    },
    bio: {
        type: String,
        required: false
    }
});
const UserModel = mongoose.models.User || model<IUser>('User', userSchema);
export { UserModel };

