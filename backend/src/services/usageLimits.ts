import { UserModel } from "../mongodb/models/userModel";
import { SubscriptionDetail } from "../mongodb/models";

const PLAN_LIMITS = {
  free: {
    rewrite: 20,
    aiWriting: 10,
    imageGeneration: 5,
    plagiairism: 20,
    summarize: 20,
  },
  basic: {
    rewrite: 100000,
    aiWriting: 500,
    imageGeneration: 100,
    plagiairism: 100000,
    summarize: 100000,
  },
  pro: {
    rewrite: 100000,
    aiWriting: 1000,
    imageGeneration: 300,
    plagiairism: 100000,
    summarize: 100000,
  },
};

export const checkAndUpdateUsage = async (
  userId: string,
  stripe_subscription_id: string,
  feature:
    | "rewrite"
    | "aiWriting"
    | "imageGeneration"
    | "plagiairism"
    | "summarize"
) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if subscription exists
  const subscription = await SubscriptionDetail.findOne({
    stripe_subscription_id,
  });

  // Determine the user's plan
  const userPlan = subscription ? subscription.current_plan : "free";

  // Check if 30 days have passed since the last reset
  const daysSinceReset = Math.floor(
    (Date.now() - user.usageLimit.lastResetDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (daysSinceReset >= 30) {
    // Reset usage counts
    user.usageLimit.rewrite = 0;
    user.usageLimit.aiWriting = 0;
    user.usageLimit.imageGeneration = 0;
    user.usageLimit.plagiairism = 0;
    user.usageLimit.summarize = 0;
    user.usageLimit.lastResetDate = new Date();
  }

  // Check if the user has exceeded their limit
  const currentUsage = user.usageLimit[feature];
  const planLimit = PLAN_LIMITS[userPlan][feature];

  if (currentUsage >= planLimit) {
    throw new Error(`You have reached your ${feature} limit for this month`);
  }

  // Increment usage
  user.usageLimit[feature] += 1;
  await user.save();

  return {
    currentUsage: user.usageLimit[feature],
    limit: planLimit,
    remaining: planLimit - user.usageLimit[feature],
  };
};
