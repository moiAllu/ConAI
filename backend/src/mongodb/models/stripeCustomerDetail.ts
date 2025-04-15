import mongoose, { Document } from "mongoose";
import { Schema, model } from "mongoose";

interface PaymentMethodDetail extends Document {
  payment_method: string;
  created_at: Date;
  payment_method_details?: {
    card?: {
      brand?: string;
      last4?: string;
      exp_month?: number;
      exp_year?: number;
      fingerprint?: string;
    };
  };
}
[];
interface IStripeCustomerDetail {
  user_id: mongoose.Schema.Types.ObjectId;
  stripe_customer_id: string;
  default_payment_method: string;
  payment_detail: PaymentMethodDetail[];
  address?: {
    city?: string;
    country?: string;
    line1?: string;
    line2?: string;
    postal_code?: string;
    state?: string;
  };
  email?: string;
  name?: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}

const stripeCustomerDetailSchema = new Schema<IStripeCustomerDetail>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stripe_customer_id: {
    type: String,
    required: true,
  },
  default_payment_method: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  phone: {
    type: String,
    required: false,
    default: "",
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
  address: {
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    line1: {
      type: String,
      default: "",
    },
    line2: {
      type: String,
      default: "",
    },
    postal_code: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
  },
  payment_detail: [
    {
      payment_method: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: new Date(),
      },
      payment_method_details: {
        card: {
          brand: {
            type: String,
          },
          last4: {
            type: String,
          },
          exp_month: {
            type: Number,
          },
          exp_year: {
            type: Number,
          },
          fingerprint: {
            type: String,
          },
        },
      },
    },
  ],
});

export const StripeCustomerDetail = model<IStripeCustomerDetail>(
  "StripeCustomerDetail",
  stripeCustomerDetailSchema
);
