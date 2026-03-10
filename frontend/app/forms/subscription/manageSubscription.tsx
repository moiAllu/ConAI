"use client";

import React from "react";
import { CreditCard, Crown, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useStripeCustomerDetailStore,
  useSubscriptionStore,
} from "@/app/dashboard/store";
import { createCustomerBillingPortalSession } from "@/lib/apicalls/subcriptionPlans";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "@/components/loading-spinner";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  description: string;
  price: number;
  nextBill: number;
  last4CardNums: string;
}

const ManageSubscription = ({
  nextBill,
}: Props) => {
  const { userSubscription } = useSubscriptionStore();
  const { stripeCustomerDetail } = useStripeCustomerDetailStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const editUserSubscriptionHandler = async () => {
    setIsLoading(true);
    const createUserEditBillingSession =
      await createCustomerBillingPortalSession(
        userSubscription.stripe_customer_id,
      );
    if (createUserEditBillingSession.status === 200) {
      setIsLoading(false);
      toast.success("Redirecting to billing portal");
      window.location.href = createUserEditBillingSession.data.url;
      return;
    }
    if (createUserEditBillingSession.status === 400) {
      toast.error(createUserEditBillingSession.message);
    }
    setIsLoading(false);
  };

  const last4 =
    stripeCustomerDetail?.payment_detail?.[0]?.payment_method_details?.card
      ?.last4;
  const memberSince =
    userSubscription.created_at &&
    new Date(userSubscription.created_at).toLocaleDateString(undefined, {
      year: "numeric",
    });

  return (
    <div className="w-full">
      <Toaster />
      {userSubscription.stripe_subscription_id ? (
        <div className="space-y-6">
          <div
            className={cn(
              "rounded-xl border border-border/50 p-4 sm:p-5",
              !userSubscription.cancel_at
                ? "bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/30"
                : "bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/30",
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <h4 className="text-base font-semibold tracking-tight">
                  Premium Member
                </h4>
                <p className="text-xs text-muted-foreground">
                  {userSubscription?.status &&
                    userSubscription.status.charAt(0).toUpperCase() +
                      userSubscription.status.slice(1)}
                  {memberSince && (
                    <span className="ml-1">
                      · Member since {memberSince}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap items-baseline gap-2 pt-1">
                  <span className="text-lg font-semibold">
                    {userSubscription?.current_plan &&
                      userSubscription.current_plan.charAt(0).toUpperCase() +
                        userSubscription.current_plan.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {userSubscription?.plan_amount != null
                      ? `$${(userSubscription.plan_amount / 100).toFixed(2)}/month`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2 rounded-xl border border-border/40 bg-muted/5 px-3 py-2">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              Unlimited Access
            </li>
            <li className="flex items-center gap-2 rounded-xl border border-border/40 bg-muted/5 px-3 py-2">
              <Calendar className="h-4 w-4 shrink-0 text-primary" />
              Cancel Anytime
            </li>
          </ul>

          <div className="rounded-xl border border-border/40 bg-muted/5 p-4 sm:p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              Payment
            </h4>
            <div className="space-y-2 text-sm">
              {userSubscription.cancel_at ? (
                <p className="text-muted-foreground">
                  Your plan will end on{" "}
                  <span className="font-medium text-foreground">
                    {new Date(
                      userSubscription.cancel_at,
                    ).toLocaleDateString()}
                  </span>
                  .
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Next bill:{" "}
                  <span className="font-medium text-foreground">
                    {userSubscription?.plan_amount != null
                      ? `$${(userSubscription.plan_amount / 100).toFixed(2)}`
                      : ""}
                  </span>{" "}
                  on{" "}
                  <span className="font-medium text-foreground">
                    {new Date(nextBill).toLocaleDateString()}
                  </span>
                </p>
              )}
              {last4 && (
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <CreditCard className="h-3.5 w-3.5 shrink-0" />
                  Card ending in {last4}
                </p>
              )}
            </div>
          </div>

          <Button
            className="w-full rounded-xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            variant="outline"
            onClick={editUserSubscriptionHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Redirecting…</span>
              </>
            ) : (
              "Manage billing"
            )}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/10 py-12 px-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
            <Crown className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mt-3 text-sm font-medium text-foreground">
            No active subscription
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Subscribe to a plan to get unlimited access.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageSubscription;
