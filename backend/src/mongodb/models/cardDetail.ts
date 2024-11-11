import mongoose,{ Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface ICardDetail extends Document {
    user_id: mongoose.Schema.Types.ObjectId,
    customer_id: string,
    card_id: string,
    card_name?: string,
    card_number?: string,
    brand?: string,
    exp_month?: number,
    exp_year?: number,
    cvc: string,
}

const cardDetailSchema = new Schema<ICardDetail>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    card_id: {
        type: String,
        required: true
    },
    card_name: {
        type: String,
        required: false
    },
    card_number: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    exp_month: {
        type: Number,
        required: false
    },
    exp_year: {
        type: Number,
        required: false
    },
    cvc: {
        type: String,
        required: true
    }
});

export const CardDetail = model<ICardDetail>('CardDetail', cardDetailSchema);