import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface ISubscriptionPlan extends Document {
    name: string;
    stripe_price_id: string;
    trail_days?: number;
    have_trial?: boolean;
    ammount: number;    
    type: string;// 0: monthly, 1: yearly
    created_at: Date;
    updated_at: Date;
    features?: string[];
    description?: string;
}

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>({
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
    stripe_price_id: {
        unique: true,
        type: String,
        required: true
    },
    trail_days: {
        type: Number,
        required: false
    },
    have_trial: {
        type: Boolean,
        required: false
    },
    ammount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    features: [],
    description: {
        type: String,
        required: false
    }
});

export const SubscriptionPlan = model<ISubscriptionPlan>('SubscriptionPlan', subscriptionPlanSchema);
