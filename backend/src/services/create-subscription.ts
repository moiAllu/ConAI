import stripe from "../stripe";
export const createCustomer = async ({name, email, token_id}) => {
    try{
        if(!name || !email || !token_id){
            throw new Error("Missing required fields");
        }
        const customer = await stripe.customers.create({
            name,
            email,
            source: token_id
        });
        if(!customer){
            throw new Error("Customer not created");
        }
        return customer;
    }
    catch(e){
        throw e;
    }
}

export const createSubscription = async ({customer_id, price_id}) => {
    try{
        if(!customer_id || !price_id){
            throw new Error("Missing required fields");
        }
        const subscription = await stripe.subscriptions.create({
            customer: customer_id,
            items: [{price: price_id}]
        });
        if(!subscription){
            throw new Error("Subscription not created");
        }
        return subscription;
    }
    catch(e){
        throw e;
    }
}

