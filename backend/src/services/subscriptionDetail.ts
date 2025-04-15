import { SubscriptionDetail } from "../mongodb/models";

export const createUserSubscription = async ({
  user_id,
  stripe_subscription_id,
  stripe_customer_id,
  subscription_plan_price_id,
  current_plan,
  status,
  plan_amount,
  plan_amount_currency,
  plan_interval,
  plan_interval_count,
  plan_period_start,
  plan_period_end,
  trial_end,
}) => {
  try {
    const userSubscriptionDetail = await SubscriptionDetail.create({
      user_id,
      stripe_subscription_id,
      stripe_customer_id,
      subscription_plan_price_id,
      current_plan,
      status,
      plan_amount,
      plan_amount_currency,
      plan_interval,
      plan_interval_count,
      plan_period_start,
      plan_period_end,
      trial_end,
    });

    return await userSubscriptionDetail.save();
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUserSubscription = async (updateData: {
  stripe_subscription_id: string;
  [key: string]: any;
}) => {
  try {
    const { stripe_subscription_id, ...updateFields } = updateData;

    const subscription = await SubscriptionDetail.findOneAndUpdate(
      { stripe_subscription_id },
      {
        $set: {
          ...updateFields,
          updated_at: new Date(),
        },
      },
      { new: true }
    );

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    return subscription;
  } catch (e) {
    throw new Error(e);
  }
};
export const updateUserSubscriptionPaymentMethod = async (updateData: {
  stripe_subscription_id: string;
  payment_method_details: {
    card: {
      brand: string;
      last4: string;
    };
  };
}) => {
  try {
    const { stripe_subscription_id, payment_method_details } = updateData;

    const subscription = await SubscriptionDetail.findOneAndUpdate(
      { stripe_subscription_id },
      {
        $set: {
          payment_method: payment_method_details,
          payment_method_details: payment_method_details,
          updated_at: new Date(),
        },
      },
      { new: true }
    );

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    return subscription;
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteUserSubscription = async ({ stripe_subscription_id }) => {
  try {
    const subscription = await SubscriptionDetail.findOneAndDelete({
      stripe_subscription_id,
    });
    if (!subscription) {
      throw new Error("Subscription not found");
    }
    return subscription;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserSubscriptionDetailService = async (userId: string) => {
  try {
    const userSubscriptionDetail = await SubscriptionDetail.findOne({
      user_id: userId,
    });
    if (!userSubscriptionDetail) {
      return null;
    }
    return userSubscriptionDetail;
  } catch (err) {
    throw new Error(err);
  }
};
