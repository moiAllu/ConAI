"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  SquarePen,
  BookText,
  Image as ImageIcon,
  Siren,
  MessageSquareMore,
  Book,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ToolCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  accent: string;
};

const cardsData: ToolCard[] = [
  {
    title: "Rewriter",
    description:
      "Rephrase and improve your writing instantly. Get multiple variations while keeping your message clear and on-brand.",
    icon: SquarePen,
    link: "/dashboard/rewrite",
    accent: "from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-600 dark:text-blue-400",
  },
  {
    title: "AI Writing",
    description:
      "Craft well-structured, descriptive, and argumentative essays for various topics with our AI essay writer.",
    icon: BookText,
    link: "/dashboard/ai-writing",
    accent: "from-indigo-500/20 to-violet-500/20 border-indigo-400/30 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Image Generator",
    description:
      "Generate images, logos, and more with advanced AI models. Describe what you need and get visuals in seconds.",
    icon: ImageIcon,
    link: "/dashboard/image-generator",
    accent: "from-teal-500/20 to-emerald-500/20 border-teal-400/30 text-teal-600 dark:text-teal-400",
  },
  {
    title: "Content Detector",
    description:
      "Detect plagiarism and AI-generated content with our crawlers and ML models. Ensure originality.",
    icon: Siren,
    link: "/dashboard/content-detector",
    accent: "from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "AI Chat",
    description:
      "Your personal chat assistant for precise outputs while maintaining privacy. Day-to-day help when you need it.",
    icon: MessageSquareMore,
    link: "/dashboard/ai-chat",
    accent: "from-violet-500/20 to-purple-500/20 border-violet-400/30 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Summarizer",
    description:
      "Create easy-to-understand summaries from websites and long texts. Save time and grasp key points quickly.",
    icon: Book,
    link: "/dashboard/summarizer",
    accent: "from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-600 dark:text-amber-400",
  },
];

const Body = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cardsData.map((card, index) => (
        <Link href={card.link} key={index} className="group block h-full">
          <Card
            className={cn(
              "h-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg ring-1 ring-primary/5",
              "transition-all duration-200 hover:shadow-xl hover:ring-primary/10 hover:scale-[1.02]",
            )}
          >
            <CardHeader className="pb-3">
              <div
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br",
                  card.accent,
                )}
              >
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-primary mt-3 flex items-center gap-2">
                {card.title}
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Body;
