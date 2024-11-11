import mongoose,{ Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface IPendingFees extends Document {
    user_id: mongoose.Schema.Types.ObjectId,
    charge_id: string,
    customer_id: string,
    amount: number,
    created_at: Date,
    updated_at: Date,
}

const pendingFeesSchema = new Schema<IPendingFees>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    charge_id: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export const PendingFees = model<IPendingFees>('PendingFees', pendingFeesSchema);