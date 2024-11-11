"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { use } from "react";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/app/dashboard/store";
import {
  createCheckoutSession,
  fetchAllPlans,
} from "@/lib/apicalls/subcriptionPlans";
import { useEffect } from "react";
import { usePlanStore } from "./store";

const AllPlans = () => {
  const { _id, email } = useMeStore((state) => state);
  const { plans, setPlans } = usePlanStore((state) => state);
  console.log(plans);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchAllPlans();
      if (response.status === 200) {
        setPlans(response.data);
      }
    };
    fetch();
  }, [_id]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start space-y-2 py-2">
        <h1 className="text-xl md:text-3xl font-semibold">All Plans</h1>
      </div>
      <Card>

        {plans.map((plan) => (
          <div key={plan._id}>
            <CardHeader className="bg-muted" key={plan._id}>
              <CardTitle>
                {plan.name.charAt(0).toUpperCase() +
                  plan.name.slice(1) +
                  " Plan"}
              </CardTitle>
              <CardDescription>
                <div className="text-sm font-semibold space-y-1 flex flex-col mt-2 ">
                  <h2>{plan?.description}</h2>
                  <h2>Price: {plan.ammount + "$"}</h2>
                </div>
              </CardDescription>
            </CardHeader>
            <Separator className="mb-2" />
            <CardContent>
              <div className="grid gap-5 sm:gap-0 sm:flex justify-between my-10 items-center">
                <ol className="text-sm space-y-2 grid-cols-2 grid  w-full">
                  {plan?.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ol>
              </div>
              <Button
                className="w-full"
                variant="outline"
                onClick={async () => {
                  const buySubscription = await createCheckoutSession(
                    plan.stripe_price_id,
                    email
                  );
                  if (buySubscription.status === 200) {
                    window.location.href = buySubscription.data.url;
                    console.log("BuySubscription", buySubscription);
                  }
                }}
              >
                Change Plan
              </Button>
            </CardContent>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default AllPlans;
