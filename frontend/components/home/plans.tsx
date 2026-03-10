import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

type Props = {
  title: string;
  description: string;
  price: string;
  features: string[];
  mostPopular?: boolean;
};

const Plans = (props: Props) => {
  return (
    <Card className="h-full flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl ring-1 ring-primary/10 dark:ring-white/10 bg-card/80 dark:bg-card/90 backdrop-blur-xl border border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold tracking-tight">
          {props.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-1">
        <ul className="space-y-2.5">
          {props.features.map((feature, index) => (
            <li className="flex gap-3 items-start text-sm" key={index}>
              <span className="mt-0.5 shrink-0 rounded-full bg-primary/10 p-0.5">
                <Check className="h-3.5 w-3.5 text-primary" />
              </span>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-6 border-t border-border/50">
        <p className="text-2xl font-bold text-primary">
          {props.price === "0" ? "Free" : `$${props.price}`}
          {props.price !== "0" && (
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          )}
        </p>
        <Button
          asChild
          size="lg"
          className="w-full rounded-xl text-base h-11 shadow-md"
        >
          <Link href="/login">Get Started</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Plans;
