import { Request, Response } from 'express';
import { storeCard } from '../services/card';
import { ICardDetail } from '../interfaces/card';

export const createCard = async (req: Request, res: Response) => {
    try {
        const {   user_id,
            customer_id,
            card_id,
            card_name,
            card_number,
            brand,
            exp_month,
            exp_year,
            cvc} = req.body;
        if (!card_number || !exp_month || !exp_year || !cvc || !user_id || !customer_id || !card_id) {
            return res.status(400).json({
                status: 400,
                message: 'Please fill all the fields'
            });
        }
        const card = await storeCard({    user_id,
            customer_id,
            card_id,
            card_name,
            card_number,
            brand,
            exp_month,
            exp_year,
            cvc
        });
        if (!card) {
            return res.status(400).json({
                status: 400,
                message: 'Card not saved'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Card saved successfully',
            data: card
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}
