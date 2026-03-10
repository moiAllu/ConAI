"use client";

import { BellRing } from "lucide-react";
import Link from "next/link";
import { useSubscriptionStore } from "../store";

const ReactivateSubscription = () => {
  const { userSubscription } = useSubscriptionStore();
  if (userSubscription.stripe_subscription_id) return null;

  return (
    <Link
      href="/forms/subscription"
      className="absolute right-4 top-4 sm:right-0 sm:top-0 z-10 inline-flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-800 dark:text-amber-200 shadow-sm transition-all hover:bg-amber-500/20 hover:shadow-md"
    >
      <BellRing className="h-4 w-4" />
      <span className="hidden sm:inline">Reactivate your subscription</span>
    </Link>
  );
};

export default ReactivateSubscription;
