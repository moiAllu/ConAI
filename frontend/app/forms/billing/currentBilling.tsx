"use client";

import React from "react";
import {
  CreditCard,
  Wallet,
  Calendar,
  Receipt,
  FileText,
  RefreshCw,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useStripeCustomerDetailStore,
  useSubscriptionStore,
} from "@/app/dashboard/store";
import { createCustomerBillingPortalSession } from "@/lib/apicalls/subcriptionPlans";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "@/components/loading-spinner";

const CurrentBilling = () => {
  const { userSubscription } = useSubscriptionStore();
  const { stripeCustomerDetail } = useStripeCustomerDetailStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const editUserSubscriptionHandler = async () => {
    setIsLoading(true);
    const res = await createCustomerBillingPortalSession(
      userSubscription.stripe_customer_id,
    );
    if (res.status === 200) {
      setIsLoading(false);
      toast.success("Redirecting to billing portal");
      window.location.href = res.data.url;
      return;
    }
    toast.error(res.message ?? "Failed to open billing portal");
    setIsLoading(false);
  };

  const paymentDetail = stripeCustomerDetail?.payment_detail?.[0];
  const card = paymentDetail?.payment_method_details?.card;
  const last4 = card?.last4;
  const expMonth = card?.exp_month;
  const expYear = card?.exp_year;
  const planName =
    userSubscription?.current_plan &&
    userSubscription.current_plan.charAt(0).toUpperCase() +
      userSubscription.current_plan.slice(1);
  const amount =
    userSubscription?.plan_amount != null
      ? (userSubscription.plan_amount / 100).toFixed(2)
      : null;

  const nextBillingDate =
    userSubscription?.cancel_at &&
    new Date(userSubscription.cancel_at).toLocaleDateString(undefined, {
      dateStyle: "medium",
    });

  return (
    <div className="w-full">
      {!userSubscription.stripe_subscription_id ? (
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/10 py-12 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
              <Wallet className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">
              No billing plan
            </p>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              You don’t have an active subscription yet. Choose a plan from the{" "}
              <strong className="text-foreground/80">Plans</strong> page to get
              started. Once you’re subscribed, this page will show your plan
              details, payment method, and a link to the secure billing portal
              where you can update your card, download invoices, or change
              plans.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Toaster />

          <Button
            className="w-full rounded-xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={editUserSubscriptionHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Redirecting…</span>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="font-medium ">Manage Card & Billing</span>
              </div>
            )}
          </Button>

          <div className="rounded-xl border border-border/40 bg-muted/5 p-4 sm:p-5">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              Current billing
            </h4>
            <p className="mt-1 mb-4 text-xs text-muted-foreground">
              Your active plan and payment details. To change anything, use the
              billing portal above.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-0.5 rounded-lg border border-border/30 bg-background/60 px-3 py-2.5">
                <span className="text-xs text-muted-foreground">Plan</span>
                <span className="text-sm font-medium">
                  {planName ? `${planName} Plan` : "—"}
                </span>
              </div>
              {amount != null && (
                <div className="flex flex-col gap-0.5 rounded-lg border border-border/30 bg-background/60 px-3 py-2.5">
                  <span className="text-xs text-muted-foreground">
                    Monthly amount
                  </span>
                  <span className="text-sm font-medium">${amount}/month</span>
                </div>
              )}
            </div>
            {nextBillingDate && (
              <div className="mt-4 flex flex-col gap-0.5 rounded-lg border border-border/30 bg-background/60 px-3 py-2.5">
                <span className="text-xs text-muted-foreground">
                  Next billing date
                </span>
                <span className="text-sm font-medium">{nextBillingDate}</span>
              </div>
            )}
            {stripeCustomerDetail?.name && (
              <p className="mt-3 text-xs text-muted-foreground">
                Billing name:{" "}
                <span className="font-medium text-foreground">
                  {stripeCustomerDetail.name}
                </span>
              </p>
            )}
            {last4 && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-border/40 bg-muted/10 px-3 py-2.5">
                <CreditCard className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <span className="text-sm">
                    Card ending in <span className="font-medium">{last4}</span>
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    To update or replace this card, use the billing portal.
                  </p>
                </div>
              </div>
            )}
            {expMonth != null && expYear != null && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>
                  Card expires {String(expMonth).padStart(2, "0")}/{expYear}
                </span>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border/40 bg-muted/5 p-4 sm:p-5">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <Shield className="h-4 w-4 text-muted-foreground" />
              In the billing portal you can
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CreditCard className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>Update or add a payment method</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>View and download invoices</span>
              </li>
              <li className="flex items-start gap-2">
                <RefreshCw className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>Upgrade or change your plan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="ml-5">
                  Cancel your subscription (access until period end)
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentBilling;
