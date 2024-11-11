import { Request, Response } from 'express';
import { getSubscriptionPlansService, storeSubscriptionPlan } from "../services/subscriptionPlan";
import { createCardToken, storeCard } from '../services/card';
import { createCustomer } from '../services/create-subscription';
import { UserModel } from '../mongodb/models';

export const addSubscriptionPlan = async (req: Request, res: Response) => {
    try{
        const {name,stripe_price_id,trail_days,have_trial,ammount,type, features , description} = req.body;
        if(!name || !stripe_price_id ){
            return res.status(400).json({
                status:400,
                message: 'Please fill all the fields'});
        }
        const subscriptionPlan = await storeSubscriptionPlan({name,stripe_price_id,trail_days,have_trial,ammount,type, features,description});
        if(!subscriptionPlan){
            return res.status(400).json({
                status:400,
                message: 'Subscription plan not saved'
            });
        }   
        return res.status(200).json({
            status:200,
            message: 'Subscription plan saved successfully',
            data: subscriptionPlan
        });
    }catch(err){
        return res.status(500).json({
            status:500,
            error: err.message
        });
    }
}
export const getSubscriptionPlans = async (req: Request, res: Response) => {
    try{
        const subscriptionPlans = await getSubscriptionPlansService();
        if(!subscriptionPlans){
            return res.status(400).json({
                status:400,
                message: 'Subscription plans not found'
            });
        }
        return res.status(200).json({
            status:200,
            data: subscriptionPlans
        });
    }
    catch(err){
        return res.status(500).json({
            status:500,
            error: err.message
        });
    }
}
export const createSubscription = async (req: Request, res: Response) => {
    const {user_id, card_number,exp_month,exp_year,cvc}= req.body;
    if(!user_id || !card_number || !exp_month || !exp_year || !cvc){
        return res.status(400).json({
            status:400,
            message: 'Please fill all the fields'
        });
    }
    try{
        const cardTokenCreadted= await createCardToken({card_number,exp_month,exp_year,cvc});
        if(!cardTokenCreadted){
            return res.status(400).json({
                status:400,
                message: 'Card token not created'
            });
        }
        const user = await UserModel.findById(user_id);
        if(!user){
            return res.status(400).json({
                status:400,
                message: 'User not found'
            });
        }
        const createdCustomer= await createCustomer({name:user.name,email:user.email,token_id:cardTokenCreadted.id});
        if(!createdCustomer){
            return res.status(400).json({
                status:400,
                message: 'Subscription not created'
            });
        }
        const cardDetailStored = await storeCard({ user_id, customer_id:createdCustomer.id, card_id:cardTokenCreadted.card.id, card_name:cardTokenCreadted.card.name, card_number:createdCustomer.last4, brand:cardTokenCreadted.card.brand, exp_month, exp_year, cvc});
        
        return res.status(200).json({
            status:200,
            message: 'Subscription plan saved successfully',
            data: cardDetailStored
        });
    }catch(err){
        return res.status(500).json({
            status:500,
            error: err.message
        });
    }
}
