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

const ManageSubscription = () => {
  return (
    <div className="w-full h-full">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto odit
            et
            <div className="text-sm font-semibold space-y-1 flex flex-col mt-2 ">
              <h2>Pro Plan</h2>
              <p>Price: 20$</p>
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
                <p>Your next bill is for Rs 349.00 on 22/07/2024.</p>
                <div className="flex items-center space-x-1">
                  <CreditCard />
                  <span>Mastercard endings are</span>
                </div>
              </div>
            </div>
          </div>
          <Button className="w-full" variant="outline">
            Change Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSubscription;
