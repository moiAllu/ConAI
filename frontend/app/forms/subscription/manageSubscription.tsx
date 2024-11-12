"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscriptionStore } from "@/app/dashboard/store";
import { createCustomerBillingPortalSession } from "@/lib/apicalls/subcriptionPlans";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "@/components/loading-spinner";

interface Props {
  name: string;
  description: string;
  price: number;
  nextBill: any;
  last4CardNums: string;
}

const ManageSubscription = ({
  name,
  description,
  price,
  nextBill,
  last4CardNums,
}: Props) => {
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
    }
    if (createUserEditBillingSession.status === 400) {
      toast.error(createUserEditBillingSession.message);
      setIsError({
        status: true,
        message: createUserEditBillingSession.message,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full h-full">
      <Toaster />
      <div className="flex flex-col justify-start space-y-2 py-2">
        <h1 className="text-xl md:text-3xl font-semibold">
          Manage Your Subscription
        </h1>
        <p className=" dark:text-gray-400 text-sm text-gray-600 ">
          {" "}
          Your are a member of ConAI since 2024
        </p>
      </div>
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle>Premium Memeber</CardTitle>
          <CardDescription>
            {description}
            <div className="text-sm font-semibold space-y-1 flex flex-col mt-2 ">
              <h2>{name}</h2>
              <p>{price}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent>
          <div className="grid gap-5 sm:gap-0 sm:flex justify-between my-10 items-center">
            <ol className="text-sm space-y-2">
              <li>Unlimited Access</li>
              <li>Cancel Anytime</li>
            </ol>
            <div className="flex flex-col space-y-4">
              <h1 className="font-semibold text-xl">Payment</h1>
              <div className="ml-2 text-sm space-y-2">
                <p>
                  Your next bill is for ${price} on {nextBill}.
                </p>
                <div className="flex items-center space-x-1">
                  <CreditCard />
                  <span>Mastercard endings are {last4CardNums}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={editUserSubscriptionHandler}
            disabled={isLoading}
          >
            <div className="flex items-center gap-1">
              {isLoading && <LoadingSpinner />}
              <span> Change Plan</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSubscription;
