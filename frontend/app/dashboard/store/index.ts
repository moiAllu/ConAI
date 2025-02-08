import _ from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    bio?: string;
}
interface Action {
    setUser: (user: User) => void;
    updateUser: (user: User) => void;
    setVerified: (verified:boolean)=>void;
}

export const useMeStore = create<User & Action>()(persist((set) => ({
    _id: '',
    name: '',
    email: '',
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),

    setUser : (user) => {
        set(user);
    },
    updateUser : (user) => {
        set((state) => ({
            ...state,
            ...user,
        }));
    },
    setVerified: (verified:boolean) => {
        set((state) => ({
            verified,
        }));
    }
    
}),{ name :"meStore", getStorage() {
    return localStorage;
},} ));

interface SubscriptionDetail {
    _id: string;
    user_id: string;
    stripe_subscription_id?: string;
    stripe_subscription_schedule_id?: string;
    stripe_customer_id: string;
    subscription_plan_price_id: string;
    status: string;
    cancel?: boolean;
    cancel_at?: Date;
    plan_amount?: number;
    plan_amount_currency: string;
    plan_interval?: string;
    plan_interval_count?: number;
    plan_period_start: Date;
    plan_period_end: Date;
    trail_end: Date;
    created_at?: Date;
    updated_at?: Date;
}

interface SubscriptionActionStore {
    userSubscription: SubscriptionDetail;
    setUserSubscription: (subscription: SubscriptionDetail) => void;
}

export const useSubscriptionStore = create<SubscriptionActionStore>()(persist((set) => ({
    userSubscription: {
        _id: '',
        user_id: '',
        stripe_subscription_id: '',
        stripe_subscription_schedule_id: '',
        stripe_customer_id: '',
        subscription_plan_price_id: '',
        status: '',
        plan_amount_currency: '',
        plan_period_start: new Date(),
        plan_period_end: new Date(),
        trail_end: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    },
    setUserSubscription : (subscription) => {
        set({ userSubscription: subscription });
    }
    
}),{ name :"subscriptionStore", getStorage() {
    return localStorage;
},} ));
