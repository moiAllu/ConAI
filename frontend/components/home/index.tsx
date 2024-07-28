import Image from "next/image";
import React from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "../ui/button";
import Plans from "./plans";
import CardCarousel from "./cardCarousel";
import Footer from "./footer";
import { Card } from "../ui/card";
import Link from "next/link";
type typeModelsList = {
  title: string;
  image: string;
};

const modelsList: typeModelsList[] = [
  {
    title: "GPT-4 Turbo",
    image: "gpt",
  },
  {
    title: "Claude 2",
    image: "claude",
  },
  {
    title: "Llamba",
    image: "llamba",
  },
  {
    title: "Stable Diffusion",
    image: "stablediffusion",
  },
];
type typePlansData = {
  title: string;
  description: string;
  features: string[];
  price: string;
};

const plansData: typePlansData[] = [
  {
    title: "Free",
    description:
      "Ideal for individual users wanting to explore the basic features. This plan offers:",
    features: [
      "Access to GPT 4 and 4 Turbo 128K",
      "Access to Llama 2 70B",
      "Access to Claude",
      "Access to Perplexity with Web Search",
    ],
    price: "0",
  },
  {
    title: "Plus",
    description:
      "Ideal for individual users wanting to explore the basic features. This plan offers:",
    features: [
      "Access to GPT 4 and 4 Turbo 128K",
      "Access to Llama 2 70B",
      "Access to Claude",
      "Access to Perplexity with Web Search",
    ],
    price: "16",
  },
  {
    title: "Enterprises",
    description:
      "Ideal for individual users wanting to explore the basic features. This plan offers:",
    features: [
      "Access to GPT 4 and 4 Turbo 128K",
      "Access to Llama 2 70B",
      "Access to Claude",
      "Access to Perplexity with Web Search",
    ],
    price: "Ask for Pricing",
  },
];

const HeroPage = () => {
  return (
    <div className=" w-full h-full flex flex-col items-center gap-28">
      <section className="w-full h-full flex flex-col items-center">
        <div className="flex flex-col justify-center items-center sm:p-16 py-10 px-5 gap-10 md:w-[800px]">
          <div className="container sm:flex flex-col items-center justify-items-center text-center sm:text-start">
            <h1 className="text-5xl font-bold text-primary md:w-[420px]">
              Write, visualize what you think?
            </h1>
            <p className="text-lg  mt-4 lg ">
              enhance your workflow, just think forget about writing on ConAi,
              All your AI tools at one place with conAI
            </p>
          </div>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
        <AspectRatio
          ratio={16 / 5}
          className="bg-muted rounded-lg border dark:border-gray-900 "
        >
          <Image
            src="/hero_grid.svg"
            alt="Photo by Drew Beamer"
            fill
            className="rounded-md object-cover bg-white dark:bg-black saturate-0 dark:brightness-[400%] contrast-[400%]"
          />
        </AspectRatio>
      </section>

      <section className=" w-full flex flex-col p-4 sm:p-10 gap-20 justify-center items-center text-center sm:text-start ">
        <h2 className="text-4xl font-bold text-primary">
          Explore our variety of language models
        </h2>
        <Card className=" sm:h-[200px] w-full items-center sm:flex justify-between sm:px-20 rounded-md shadow-sm ">
          {modelsList.map((model, index) => (
            <div
              className="flex items-center justify-center w-full px-2"
              key={index}
            >
              <div className="p-1">
                <Image
                  src={`/models/${model.image}.svg`}
                  alt={`${model.image}`}
                  width={78}
                  height={78}
                  className="rounded-md object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-primary ">{model.title}</h3>
            </div>
          ))}
        </Card>
      </section>
      <section className=" w-full flex flex-col p-4 sm:p-10  gap-20 justify-center items-center  ">
        <div className=" flex flex-col gap-5 justify-center items-center md:w-[80%] text-center sm:text-start">
          <h2 className="text-4xl font-bold text-primary ">Our Plans</h2>
          <h3 className="text-xl text-gray-800 text-primary ">
            Transparent, flexible plans to suit your budget and specific needs
            effortlessly
          </h3>
        </div>
        <div className="grid grid-flow-row sm:grid-cols-2 lg:grid-cols-3  gap-4 justify-center items-center">
          {plansData.map((plan, index) => (
            <Plans
              key={index}
              title={plan.title}
              description={plan.description}
              features={plan.features}
              price={plan.price}
            />
          ))}
        </div>
      </section>
      {/* <section className=" w-full flex flex-col sm:p-10 p-4 gap-20 justify-center items-center ">
        <div className=" flex flex-col gap-5 justify-center items-center md:w-[80%] text-center sm:text-start ">
          <h2 className="text-4xl font-bold text-primary ">
            {"Don't take our word"}
          </h2>
          <h3 className="text-xl text-gray-800 text-primary ml-4 ">
            Hear from satisfied users whose stories reflect our commitment to
            excellence and user success
          </h3>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <CardCarousel />
        </div>
      </section> */}
    </div>
  );
};

export default HeroPage;
