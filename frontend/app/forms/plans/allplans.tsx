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
import { useMeStore } from "@/app/dashboard/store";

const allPlans = [
  {
    id: 0,
    title: "Free Plan",
    description: "Starter",
    price: "0$",
    features: [
      "10 rewrites per day",
      "Unlimited AI Chats-(basic model)",
      "10 Plagiarism Checks",
      "10 Summarizes",
      "5 AI Generated Photos",
      "10 AI writtings",
    ],
  },
  {
    id: 1,
    title: "Basic Plan",
    description: "Necessary for beginners",
    price: "10$",
    features: [
      "Unlimited Rewrites",
      "Unlimited AI Chats",
      "Unlimited Plagiarism Checks",
      "Unlimited Summarizes",
      "100 AI Generated Photos",
      "500 AI writtings",
      "support 24/7",
      "Cancel Anytime",
    ],
  },
  {
    id: 2,
    title: "Pro Plan",
    description: "Best for professionals",
    price: "16$",
    features: [
      "Unlimited Access",
      "Unlimited Rewrites",
      "Unlimited AI Chats",
      "Unlimited Plagiarism Checks",
      "Unlimited Summarizes",
      "300 AI Generated Photos",
      "1000 AI writtings",
      "support 24/7",
      "Cancel Anytime",
    ],
  },
  {
    id: 3,
    title: "Enterprise Plan",
    description: "For large teams",
    price: "ask for price",
    features: [
      "Customize your plan",
      "Unlimited Access",
      "Unlimited Rewrites",
      "Unlimited AI Chats",
      "Unlimited Plagiarism Checks",
      "Unlimited Summarizes",
      "500 AI Generated Photos",
      "2000 AI writtings",
      "support 24/7",
      "Cancel Anytime",
      "Dedicated Account Manager",
      "Custom AI Models",
      "Group Workspaces",
    ],
  },
];
const AllPlans = () => {
  const { _id } = useMeStore((state) => state);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start space-y-2 py-2">
        <h1 className="text-xl md:text-3xl font-semibold">All Plans</h1>
      </div>
      <Card>
        {allPlans.map((plan) => (
          <div key={plan.id}>
            <CardHeader className="bg-muted" key={plan.id}>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>
                <div className="text-sm font-semibold space-y-1 flex flex-col mt-2 ">
                  <h2>Price: {plan.price}</h2>
                </div>
              </CardDescription>
            </CardHeader>
            <Separator className="mb-2" />
            <CardContent>
              <div className="grid gap-5 sm:gap-0 sm:flex justify-between my-10 items-center">
                <ol className="text-sm space-y-2 grid-cols-2 grid  w-full">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ol>
              </div>
              <Button className="w-full" variant="outline">
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
