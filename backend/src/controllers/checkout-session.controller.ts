
import { Request, Response } from 'express';
import { createUserSubscription, getUserSubscriptionDetailService } from '../services/subscriptionDetail';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const createCheckoutSession = async (req: Request, res: Response) => {
    const {priceId} =req.params;
    const {email,userId:user_id} = req.body;
    if(!priceId){
      return  res.status(400).json({
            status:400,
            message: 'Please fill all the fields'
        });
    }
    try{    
        const userSubscripedAlready= await getUserSubscriptionDetailService(user_id);
        if(userSubscripedAlready){
            return res.status(400).json({
                status:400,
                message: 'User already subscribed'
            });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            success_url: `${process.env.CLIENT_URL}/forms/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/forms/plans`,
        });
        if(!session){
          return res.status(400).json({
                status:400,
                message: 'Session not created'
            });
        }
        return res.status(200).json(
            {
                status:200,
                data:session,
            }
        );
    }
    catch(e){
       return res.status(500).json({
            status:500,
            message: e
        });
    }
}
export const retreiveCheckoutSession = async (req:Request,res:Response)=>{
    const {sessionId,userId}=req.params;
    const user_id=userId;
    try{
        const userSubscripedAlready= await getUserSubscriptionDetailService(user_id);
        if(userSubscripedAlready){
            return res.status(400).json({
                status:400,
                message: 'User already subscribed'
            });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId,{expand:["subscription","customer"]});
        if(!session){
            return res.status(400).json({
                status:400,
                message: 'Session not found'
            });
        }
        
        const userDetailSubcription= createUserSubscription({user_id,stripe_subscription_id:session.subscription.id ,stripe_subscription_schedule_id:session.subscription.id,stripe_customer_id:session.customer.id, subscription_plan_price_id:session.subscription.plan.id,status:session.subscription.status,plan_amount:session.subscription.plan.amount,plan_amount_currency:session.subscription.plan.currency,plan_interval:session.subscription.plan.interval,plan_interval_count:session.subscription.plan.interval_count })
        if(!userDetailSubcription){
            return res.status(400).json({
                status:400,
                message: 'User subscription not created'
            });
        }
        return res.status(200).json(
            {
                status:200,
                data:session,
              
            }
        );
    }
    catch(e){
        return res.status(500).json({
            status:500,
            message: e
        });
    }
}

export const createBillingSession = async (req:Request,res:Response)=>{
    const {billingId}=req.params

    try{
  
        const session = await stripe.billingPortal.session.create({
            customer: billingId,
            return_url: `${process.env.CLIENT_URL}/forms/billing`,
        })
        if(!session){
            return res.status(400).json({
                status:400,
                message: 'Session not created'
            });
        }
        return res.status(200).json(
            {
                status:200,
                data:session,
            }
        );
    }
    catch(e){
        return res.status(500).json({
            status:500,
            message: e
        });
    }
}
export const createBillingPortalSession = async (req:Request,res:Response)=>{
    const {customerId}=req.params
    try{
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.CLIENT_URL}/forms/billing`,
        })
        if(!session){
            return res.status(400).json({
                status:400,
                message: 'Session not created'
            });
        }
        return res.status(200).json(
            {
                status:200,
                data:session,
            }
        );
    }
    catch(e){
        return res.status(500).json({
            status:500,
            message: e
        });
    }
}