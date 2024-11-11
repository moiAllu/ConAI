import mongoose from 'mongoose';
export interface ICardDetail  {
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