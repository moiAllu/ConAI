import React from "react";
import { Button } from "../ui/button";
import Plans from "./plans";
import Link from "next/link";
import FeaturesSection from "./FeaturesSection";

type typeModelsList = {
  title: string;
  initial: string;
  accent: string; // Tailwind classes: bg-*/20 dark:bg-*/30 text-* dark:text-*
};

const modelsList: typeModelsList[] = [
  {
    title: "GPT-4 Turbo",
    initial: "GPT",
    accent:
      "bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30 dark:ring-emerald-400/30",
  },
  {
    title: "Claude 2",
    initial: "CL",
    accent:
      "bg-amber-500/15 dark:bg-amber-400/20 text-amber-800 dark:text-amber-200 ring-amber-500/30 dark:ring-amber-400/30",
  },
  {
    title: "Llama",
    initial: "LL",
    accent:
      "bg-orange-500/15 dark:bg-orange-400/20 text-orange-700 dark:text-orange-300 ring-orange-500/30 dark:ring-orange-400/30",
  },
  {
    title: "Stable Diffusion",
    initial: "SD",
    accent:
      "bg-violet-500/15 dark:bg-violet-400/20 text-violet-700 dark:text-violet-300 ring-violet-500/30 dark:ring-violet-400/30",
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
      "Start with free plan to explore the features. This plan offers:",
    features: [
      "Unlimited AI Chats",
      "20 Rewrites",
      "20 Plagiarism Checks",
      "20 Summarizes",
      "10 AI Generated Photos",
      "10 AI writtings",
    ],
    price: "0",
  },
  {
    title: "Basic",
    description:
      "Ideal for individual users wanting to explore the basic features. This plan offers:",
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
    price: "10",
  },
  {
    title: "Pro",
    description:
      "Best for professionals and small teams looking to scale their content creation. This plan offers:",
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
    price: "20",
  },
];

const HeroPage = () => {
  return (
    <div className=" w-full h-full flex flex-col items-center gap-14 sm:gap-16 ">
      <section
        id="hero"
        className="relative w-full min-h-[60vh] flex flex-col items-center justify-center scroll-mt-20 overflow-hidden"
      >
        <div className="flex flex-col items-center text-center px-4 sm:px-6 pt-12 sm:pt-16 pb-8 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            All your AI tools in one workflow
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight leading-[1.1] max-w-3xl">
            Rewrite, humanize, detect{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
              & create
            </span>{" "}
            — all in one place
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            Check plagiarism, generate and enhance images, and polish your
            content with AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-base px-8 h-12 rounded-xl shadow-lg shadow-primary/20"
              >
                Get Started
              </Button>
            </Link>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Try tools below ↓
            </a>
          </div>
        </div>

        <FeaturesSection />
      </section>

      <section
        id="models"
        className="relative w-full flex flex-col items-center scroll-mt-20 px-4 sm:px-6 overflow-hidden pb-14"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-12">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Powered by leading AI
          </span>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
              Explore our variety of{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                language models
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
              GPT-4, Claude, Llama, Stable Diffusion — all in one platform.
            </p>
          </div>
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg ring-1 ring-primary/10 dark:ring-white/10 bg-card/80 dark:bg-card/90 backdrop-blur-xl border border-border/50">
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-evenly sm:gap-0 gap-6 p-8 sm:py-12 sm:px-10">
              {modelsList.map((model, index) => (
                <div
                  className="flex flex-col items-center justify-center gap-3 sm:gap-4 px-2"
                  key={index}
                >
                  <div
                    className={`rounded-2xl p-4 ring-1 min-w-[72px] min-h-[72px] flex items-center justify-center font-bold text-xl sm:text-2xl tracking-tight ${model.accent}`}
                  >
                    {model.initial}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-primary">
                    {model.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="plans"
        className="relative w-full flex flex-col items-center scroll-mt-20 px-4 sm:px-6 overflow-hidden pb-14"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-12">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Simple pricing
          </span>
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Plans
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Transparent, flexible plans to suit your budget and specific
              needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
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
