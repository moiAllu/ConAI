"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { fetchCheckoutSessionSuccess } from "@/lib/apicalls/subcriptionPlans";
import { useMeStore, useSubscriptionStore } from "@/app/dashboard/store";
import ManageSubscription from "@/app/forms/subscription/manageSubscription";
import { toast } from "sonner";
const CheckoutSession = () => {
  const { setUserSubscription } = useSubscriptionStore();
  const userId = useMeStore((state) => state._id);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  console.log(sessionId);
  useEffect(() => {
    if (sessionId) {
      // Call the backend to get the session details
      const retreiveCheckoutSession = async () => {
        const checkoutSession = await fetchCheckoutSessionSuccess(
          sessionId,
          userId
        );
        if (checkoutSession.status === 200) {
          console.log(checkoutSession.data);
          setUserSubscription({
            _id: checkoutSession.data.subscription.id,
            user_id: userId,
            stripe_subscription_id: checkoutSession.data.subscription.id,
            stripe_subscription_schedule_id:
              checkoutSession.data.subscription.id,
            stripe_customer_id: checkoutSession.data.customer.id,
            subscription_plan_price_id:
              checkoutSession.data.subscription.plan.id,
            status: checkoutSession.data.subscription.status,
            plan_amount: checkoutSession.data.subscription.plan.amount,
            plan_amount_currency:
              checkoutSession.data.subscription.plan.currency,
            plan_interval: checkoutSession.data.subscription.plan.interval,
            plan_interval_count:
              checkoutSession.data.subscription.plan.interval_count,
            plan_period_end:
              checkoutSession.data.subscription.current_period_end,
            plan_period_start:
              checkoutSession.data.subscription.current_period_start,
            trail_end: checkoutSession.data.subscription.trail_end,
          });
          toast.success("Subscription created successfully");
        } else {
          toast.error("All ready subscribed");
        }
      };
      retreiveCheckoutSession();
    }
  }, [sessionId]);

  return (
    <ManageSubscription
      name={"Basic"}
      description={"lorem ipsum"}
      price={10}
      nextBill={Date.now()}
      last4CardNums={"2313"}
    />
  );
};

export default CheckoutSession;
