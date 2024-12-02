"use client";
import { BellRing } from "lucide-react";
import Link from "next/link";
import { useSubscriptionStore } from "../store";
const ReactivateSubscription = () => {
  const { userSubscription } = useSubscriptionStore();
  return (
    <Link
      className={`flex ${
        userSubscription.stripe_subscription_id && "hidden"
      } justify-end items-end cursor-pointer absolute right-4 sm:right-12 top-18 sm:top-8`}
      href="/forms/subscription"
    >
      <div className="flex px-2 py-2 items-end gap-2 justify-center rounded  border border-gray-400 shadow-sm  transition-colors">
        <BellRing size={18} />
        <h1 className="font-medium text-sm font-sans hidden sm:flex">
          Reactivate your subscription
        </h1>
      </div>
    </Link>
  );
};
export default ReactivateSubscription;
