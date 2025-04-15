import { StripeCustomerDetail } from "../mongodb/models/stripeCustomerDetail";
import { Types } from "mongoose";

interface ICreateStripeCustomerDetail {
  user_id: Types.ObjectId | string;
  stripe_customer_id: string;
  default_payment_method?: string;
  payment_detail?: {
    payment_method: string;
    payment_method_details?: {
      card?: {
        brand?: string;
        last4?: string;
        exp_month?: number;
        exp_year?: number;
        fingerprint?: string;
      };
    };
  }[];
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
}

interface IUpdateStripeCustomerDetail {
  stripe_customer_id: string;
  default_payment_method?: string;
  payment_detail?: {
    payment_method: string;
    payment_method_details?: {
      card?: {
        brand?: string;
        last4?: string;
        exp_month?: number;
        exp_year?: number;
        fingerprint?: string;
      };
    };
  }[];
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
}

export const createStripeCustomerDetail = async (
  input: ICreateStripeCustomerDetail
) => {
  try {
    const customerDetail = new StripeCustomerDetail({
      user_id: input.user_id,
      stripe_customer_id: input.stripe_customer_id,
      default_payment_method: input.default_payment_method,
      payment_detail: input.payment_detail,
      address: input.address,
      email: input.email,
      name: input.name,
      phone: input.phone,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedCustomerDetail = await customerDetail.save();
    return savedCustomerDetail;
  } catch (error) {
    console.error("Error creating stripe customer detail:", error);
    throw error;
  }
};

export const updateStripeCustomerDetail = async (
  stripe_customer_id: string,
  input: Partial<IUpdateStripeCustomerDetail>
) => {
  try {
    const updateData = {
      ...input,
      updated_at: new Date(),
    };

    const updatedCustomerDetail = await StripeCustomerDetail.findOneAndUpdate(
      { stripe_customer_id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedCustomerDetail) {
      throw new Error("Stripe customer detail not found");
    }

    return updatedCustomerDetail;
  } catch (error) {
    console.error("Error updating stripe customer detail:", error);
    throw error;
  }
};

// Helper function to add a payment method to existing customer
export const addPaymentMethod = async (
  stripe_customer_id: string,
  paymentMethod: {
    payment_method: string;
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
) => {
  try {
    const updatedCustomerDetail = await StripeCustomerDetail.findOneAndUpdate(
      { stripe_customer_id },
      {
        $push: { payment_detail: { ...paymentMethod, created_at: new Date() } },
        $set: { updated_at: new Date() },
      },
      { new: true }
    );

    if (!updatedCustomerDetail) {
      throw new Error("Stripe customer detail not found");
    }

    return updatedCustomerDetail;
  } catch (error) {
    console.error("Error adding payment method:", error);
    throw error;
  }
};

export const getStripeCustomerDetailByCustomerId = async (
  customerId: string
) => {
  try {
    const customerDetail = await StripeCustomerDetail.findOne({ customerId });
    return customerDetail;
  } catch (error) {
    console.error("Error fetching stripe customer detail:", error);
    throw error;
  }
};

export const getStripeCustomerDetailByUserId = async (
  userId: Types.ObjectId | string
) => {
  try {
    const customerDetail = await StripeCustomerDetail.findOne({ userId });
    return customerDetail;
  } catch (error) {
    console.error("Error fetching stripe customer detail:", error);
    throw error;
  }
};

export const deleteStripeCustomerDetail = async (
  stripe_customer_id: string
) => {
  try {
    await StripeCustomerDetail.findOneAndDelete({ stripe_customer_id });
  } catch (error) {
    console.error("Error deleting stripe customer detail:", error);
    throw error;
  }
};
