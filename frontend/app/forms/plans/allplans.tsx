"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/app/dashboard/store";
import {
  createCheckoutSession,
  fetchAllPlans,
} from "@/lib/apicalls/subcriptionPlans";
import { usePlanStore } from "./store";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const AllPlans = () => {
  const { email } = useMeStore((state) => state);
  const { plans, setPlans } = usePlanStore((state) => state);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchAllPlans();
      if (response.status === 200) {
        setPlans(response.data);
      }
    };
    fetch();
  }, [setPlans]);

  return (
    <div className=" w-full space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan._id}
            className={cn(
              "flex flex-col overflow-hidden rounded-2xl border border-border/50",
              "bg-background/80 shadow-sm transition-shadow hover:shadow-md",
            )}
          >
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-lg">
                  {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)} Plan
                </CardTitle>
              </div>
              <CardDescription className="mt-2 text-sm">
                {plan?.description}
              </CardDescription>
              <p className="mt-2 text-xl font-semibold tracking-tight">
                {plan.ammount}$
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4 pt-4">
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {plan?.features?.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-auto w-full rounded-xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                variant="outline"
                onClick={async () => {
                  const buySubscription = await createCheckoutSession(
                    plan.stripe_price_id,
                    email,
                  );
                  if (buySubscription.status === 200) {
                    window.location.href = buySubscription.data.url;
                  }
                }}
              >
                Choose plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllPlans;
