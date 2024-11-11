import { ICardDetail } from "interfaces/card"
import { CardDetail } from "../mongodb/models"
const stripe = require('stripe')(process.env.STRIPE_PUBLIC_KEY);

export const createCardToken = async ({card_number,exp_month,exp_year,cvc}) => {
    try{
        const cardToken = await stripe.tokens.create({
            card: {
                number: card_number,
                exp_month,
                exp_year,
                cvc
            }
        });
        if(!cardToken){
            throw new Error("Card token not created");
        }
        return cardToken;
    }
    catch(e){
        throw e;
    }
}
export const storeCard = async ({ user_id,customer_id,card_id,card_name,card_number,brand,exp_month,exp_year,cvc}:ICardDetail) => {
    try{
        const cardDetail = new CardDetail({
            user_id,
            customer_id,
            card_id,
            name: card_name ? card_name : "",
            card_number,
            brand,
            exp_month,
            exp_year,
            cvc
        });
        const savedCardDetail = await cardDetail.save();
        if(!savedCardDetail){
            throw new Error("Card detail not saved");
        }
        return savedCardDetail;
    }
    catch(e){
        throw e;
    }
}

    