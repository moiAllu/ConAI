import { SubscriptionPlan } from "../mongodb/models"
interface ISubscriptionPlan {
    name: string;
    stripe_price_id: string;
    trail_days: number;
    have_trial: boolean;
    ammount: number;    
    type: string;// 0: monthly, 1: yearly
    created_at?: Date;
    updated_at?: Date;
    features?: string[];
    description?: string;
}

export const storeSubscriptionPlan = async ({name,stripe_price_id,trail_days,have_trial,ammount,type,features,description}:ISubscriptionPlan) => {
    try{
        if(!name || !stripe_price_id){
            throw new Error("Missing required fields");
        }
        const subscriptionPlan = new SubscriptionPlan({
            name,
            stripe_price_id,
            trail_days,
            have_trial,
            ammount,
            type,
            features,
            description,
            created_at: new Date(),
            updated_at: new Date()
        });
        const savedSubscriptionPlan = await subscriptionPlan.save();
        if(!savedSubscriptionPlan){
            throw new Error("Subscription plan not saved");
        }
        return savedSubscriptionPlan;
    }
    catch(e){
        throw e;
    }
}
export const getSubscriptionPlansService = async () => {
    try{
        const subscriptionPlans = await SubscriptionPlan.find();
        if(!subscriptionPlans){
            throw new Error("Subscription plans not found");
        }
        return subscriptionPlans;
    }
    catch(e){
        throw e;
    }
}