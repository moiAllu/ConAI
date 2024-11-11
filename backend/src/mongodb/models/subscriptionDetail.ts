import mongoose, { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface ISubscriptionDetail extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    stripe_subscription_id?: string;
    stripe_subscription_schedule_id?: string;
    subscription_plan_price_id: string;
    stripe_customer_id: string;
    status: string;
    cancel?: boolean;
    cancel_at?: Date;
    plan_amount?: number;
    plan_amount_currency: string;
    plan_interval?: string;
    plan_interval_count?: number;
    plan_period_start: Date;
    plan_period_end: Date;
    trail_end: Date;
    created_at: Date;
    updated_at: Date;
}

export const subscriptionDetailSchema = new Schema<ISubscriptionDetail>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    stripe_subscription_id: {
        type: String,
        required: false
    },
    stripe_subscription_schedule_id: {
        type: String,
        required: false
    },
    stripe_customer_id: {
        type: String,
        required: true
    },
    subscription_plan_price_id: {
        type: String,
        required: true,
        ref: 'SubscriptionPlan'
    },
    status: {
        type: String,
        enum: ['active', 'canceled'],
        required: true
    },
    plan_amount: {
        type: Number,
        required: false 
    },
    plan_amount_currency: {
        type: String,
        required: true
    },
    plan_interval: {
        type: String,
        required: false
    },
    plan_interval_count: {
        type: Number,
        required: false
    },
    plan_period_start: {
        type: Date,
        required: true,
        default: Date.now
    },
    plan_period_end: {
        type: Date,
        required: false,
        default:null
    },
    trail_end: {
        type: Date,
        default: null 
    },
    cancel: {
        type: Boolean,
        default: false
    },
    cancel_at: {
        type: Date,
        default: null
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
export const SubscriptionDetail = model<ISubscriptionDetail>('SubscriptionDetail', subscriptionDetailSchema);