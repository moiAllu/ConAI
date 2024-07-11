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

type Props = {
  title: string;
  description: string;
  price: string;
  features: string[];
  mostPopular?: boolean;
};
const Plans = (props: Props) => {
  return (
    <Card className="w-[350px] min-h-[550px] justify-between flex flex-col shadow-md ">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {props.features.map((feature, index) => {
            return (
              <li className="flex gap-2 items-center p-2  " key={index}>
                <span className="flex h-2 w-2 rounded-full bg-black" />
                <span className="text-[14px]">{feature}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <br />
      <CardFooter>
        <div className="flex flex-col justify-end items-end w-full">
          <h3>{props.price} $</h3>
          <div>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Plans;
