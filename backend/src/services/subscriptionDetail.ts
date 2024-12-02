import { SubscriptionDetail } from "../mongodb/models"
export const createUserSubscription = async ({user_id,stripe_subscription_id,stripe_subscription_schedule_id,stripe_customer_id,subscription_plan_price_id, status,plan_amount,plan_amount_currency,plan_interval ,plan_interval_count}) => {
    try{
        const userSubcriptionDetail= await SubscriptionDetail.create({
            user_id,
            stripe_subscription_id,
            stripe_subscription_schedule_id,
            stripe_customer_id,
            subscription_plan_price_id,
            status,
            plan_amount,
            plan_amount_currency,
            plan_interval,
            plan_interval_count,
        });
        const saved = await userSubcriptionDetail.save();
        if(saved){
            return userSubcriptionDetail
        }
        throw new Error('User subscription not created')
    }
    catch (e){
        throw new Error(e)
    }
}
export const getUserSubscriptionDetailService = async (userId:string) => {
    try {
        const userSubscriptionDetail = await SubscriptionDetail.findOne({ user_id : userId });
        if (!userSubscriptionDetail) {
            return null;
        }
        return userSubscriptionDetail;
    }
    catch (err) {
        throw new Error(err)
    }
}
