"use client";
import React from "react";
import PaymentMethod from "./paymentMethod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscriptionStore } from "@/app/dashboard/store";
import { createCustomerBillingPortalSession } from "@/lib/apicalls/subcriptionPlans";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "@/components/loading-spinner";
const CurrentBilling = () => {
  const { userSubscription } = useSubscriptionStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState({ status: false, message: "" });
  const editUserSubscriptionHandler = async () => {
    setIsError({
      status: false,
      message: "",
    });
    setIsLoading(true);
    const createUserEditBillingSession =
      await createCustomerBillingPortalSession(
        userSubscription.stripe_customer_id
      );
    if (createUserEditBillingSession.status === 200) {
      setIsLoading(false);
      toast.success("Redirecting to billing portal");
      window.location.href = createUserEditBillingSession.data.url;
      return;
    }
    toast.error("Failed to create billing session");
    setIsError({
      status: true,
      message: createUserEditBillingSession.message,
    });
    setIsLoading(false);
  };

  return (
    <div className={`w-full`}>
      {!userSubscription.stripe_subscription_id ? (
        <div className="flex w-full text-center justify-center text-2xl font-bold">
          <h1>You donot have any subscription & billing plan</h1>
        </div>
      ) : (
        <div>
          <Toaster />
          <div className="m-4 hover:cursor-pointer justify-center flex">
            <Button
              className="w-full hover:cursor-pointer max-w-md"
              onClick={editUserSubscriptionHandler}
              disabled={isLoading}
            >
              <div className="flex items-center gap-1">
                {isLoading && <LoadingSpinner />}
                <Plus size={16} />
                <span>Add/Manage Billing Method</span>
              </div>
            </Button>
          </div>
          <Card className="max-w-ms">
            <CardHeader>
              <CardTitle>Current Billing</CardTitle>
              <CardDescription>
                Update your billing settings. Add multiple bulling options
              </CardDescription>
            </CardHeader>
            <Separator className="" />
            <CardContent className="p-6">
              <div className=" flex justify-between items-center">
                <h1 className="text-xl font-semibold">Master</h1>
                <span className="text-sm">Pro Plan</span>
              </div>
              <h1>******4242</h1>
              <CardDescription>
                <h1>Ali Asghar Abbasi</h1>
                <h1>10$</h1>
                <h1>Monthly</h1>
              </CardDescription>
            </CardContent>
            <Separator className="mb-4" />
            <CardFooter>
              <CardDescription>
                <div className="flex justify-between items-center ">
                  <h1>Expires on 27/12</h1>
                </div>
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CurrentBilling;
