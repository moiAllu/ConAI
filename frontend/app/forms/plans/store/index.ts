import _ from 'lodash';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

interface Plan {
    _id: string;
    name: string;
    stripe_price_id: string;
    trail_days?: number;
    have_trial?: boolean;
    ammount: number;    
    type: string;// 0: monthly, 1: yearly
    features: string[];
    created_at: Date;
    updated_at: Date;
    description: string;
}

interface PlanHistory {
    plans: Plan[];
}

interface Action {
    setPlans: (plans: Plan[]) => void;
}
export const usePlanStore = create<PlanHistory & Action>()(persist((set) => ({
    plans: [],
    setPlans: (plans) => {
        set({plans});
    },
}),{ name :"planStore", getStorage() {
    return localStorage;
},} ));

