export const fetchAllPlans = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONAI_BACKEND_URL}/api/all-plans`, {
            credentials:"include",
            method: 'GET',
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("accessToken") || "",
            },
        });
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export const createCheckoutSession= async(priceId:string,email:string)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONAI_BACKEND_URL}/api/checkout-session/${priceId}`, {
            credentials:"include",
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("accessToken") || "",
            },
            body: JSON.stringify({email}),
        });
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export const fetchCheckoutSessionSuccess= async(sessionId:string,userId:string)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONAI_BACKEND_URL}/api/retreive-checkout-session/${sessionId}/${userId}`, {
            credentials:"include",
            method: 'GET',
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("accessToken") || "",
                // body: JSON.stringify({userId})
            },
        });
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export const createCustomerBillingPortalSession = async(customerId:string)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONAI_BACKEND_URL}/api/create-billing-portal-session/${customerId}`, {
            credentials:"include",
            method: 'GET',
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("accessToken") || "",
            },
        });
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export const getUserSubscriptionDetails= async(userId:string)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONAI_BACKEND_URL}/api/user-subscription/${userId}`, {
            credentials:"include",
            method: 'GET',
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("accessToken") || "",
            },
        });
        return response.json();
    } catch (err) {
        console.log(err);
    }
}