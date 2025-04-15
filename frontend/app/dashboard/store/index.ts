import _ from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  stripe_subscription_id?: string;
  plan?: "free" | "basic" | "pro";
  usageLimit: {
    rewrite: number;
    aiWriting: number;
    imageGeneration: number;
    plagiairism: number;
    summarize: number;
    lastResetDate: Date;
  };
}
interface Action {
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  setVerified: (verified: boolean) => void;
  incrementUsageLimit: (
    mode:
      | "rewrite"
      | "aiWriting"
      | "imageGeneration"
      | "plagiairism"
      | "summarize"
  ) => void;
  resetUsageLimit: () => void;
}

export const useMeStore = create<User & Action>()(
  persist(
    (set) => ({
      _id: "",
      name: "",
      email: "",
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      bio: "",
      stripe_subscription_id: "",
      plan: "free",
      usageLimit: {
        rewrite: 0,
        aiWriting: 0,
        imageGeneration: 0,
        plagiairism: 0,
        summarize: 0,
        lastResetDate: new Date(),
      },
      // Increment usage limit for a specific mode
      incrementUsageLimit: (
        mode:
          | "rewrite"
          | "aiWriting"
          | "imageGeneration"
          | "plagiairism"
          | "summarize"
      ) => {
        set((state) => ({
          usageLimit: {
            ...state.usageLimit,
            [mode]: state.usageLimit[mode] + 1, // Increment the specific mode by 1
          },
        }));
      },
      // Reset usage limits
      resetUsageLimit: () => {
        set((state) => ({
          usageLimit: {
            ...state.usageLimit,
            rewrite: 0,
            aiWriting: 0,
            imageGeneration: 0,
            plagiairism: 0,
            summarize: 0,
          },
        }));
      },
      // Set user
      setUser: (user) => {
        set(user);
      },
      updateUser: (user) => {
        set((state) => ({
          ...state,
          ...user,
        }));
      },
      setVerified: (verified: boolean) => {
        set((state) => ({
          verified,
        }));
      },
    }),
    {
      name: "meStore",
      getStorage() {
        return localStorage;
      },
    }
  )
);

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
  plan_amount: number | 0;
  plan_amount_currency: string;
  plan_interval?: string;
  plan_interval_count?: number;
  plan_period_start: Date;
  plan_period_end: Date;
  trail_end: Date;
  created_at?: Date;
  updated_at?: Date;
  current_plan: string;
}

interface SubscriptionActionStore {
  userSubscription: SubscriptionDetail;
  setUserSubscription: (subscription: SubscriptionDetail) => void;
}

export const useSubscriptionStore = create<SubscriptionActionStore>()(
  (set) => ({
    userSubscription: {
      _id: "",
      user_id: "",
      stripe_subscription_id: "",
      stripe_subscription_schedule_id: "",
      stripe_customer_id: "",
      subscription_plan_price_id: "",
      status: "",
      plan_amount_currency: "",
      current_plan: "",
      plan_period_start: new Date(),
      plan_period_end: new Date(),
      trail_end: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      plan_amount: 0,
    },
    setUserSubscription: (subscription) => {
      set({ userSubscription: subscription });
    },
  })
);

interface StripeCustomerDetail {
  _id: string;
  user_id: string;
  stripe_customer_id: string;
  default_payment_method: string;
  email: string;
  name: string;
  payment_detail: {
    payment_method: string;
    payment_method_details: {
      card: {
        brand: string;
        last4: string;
        exp_month: number;
        exp_year: number;
        fingerprint: string;
      };
    };
  }[];
  created_at?: Date;
  updated_at?: Date;
}
interface StripeCustomerDetailActionStore {
  stripeCustomerDetail: StripeCustomerDetail;
  setStripeCustomerDetail: (customerDetail: StripeCustomerDetail) => void;
}

export const useStripeCustomerDetailStore =
  create<StripeCustomerDetailActionStore>((set) => ({
    stripeCustomerDetail: {
      _id: "",
      user_id: "",
      stripe_customer_id: "",
      default_payment_method: "",
      email: "",
      name: "",
      payment_detail: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    setStripeCustomerDetail: (customerDetail) => {
      set({ stripeCustomerDetail: customerDetail });
    },
  }));
