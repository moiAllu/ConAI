import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Inbox,
  BookText,
  Siren,
  MessageSquareMore,
  ImagePlus,
  Book,
} from "lucide-react";

import Link from "next/link";
const cardsData = [
  {
    title: "Rewriter",
    description:
      "Effortlessly Remove any plagiarism from your content with our Advance ML model. Feel confident your text isn't detectable by AI with our 95% accurate AI Content Detector.",
    icon: <Inbox />,
    link: "/dashboard/rewrite",
  },
  {
    title: "AI Writing",
    description:
      "Our AI Essay Writer crafts well-structured, descriptive, research, and argumentative essays for various topics, perfect for papers and articles.",
    icon: <BookText />,
    link: "/dashboard/ai-writing",
  },
  {
    title: "Image Generator",
    description:
      "Generate Images, Logos, Gifs, and much more with our Advance AI models.",
    icon: <Siren />,
    link: "/dashboard/image-generator",
  },
  {
    title: "Content Detector",
    description:
      "Detect Plagairism and AI with our most advance crawlers and ML models.",
    icon: <MessageSquareMore />,
    link: "/dashboard/content-detector",
  },
  {
    title: "AI Chat",
    description:
      "Day to day your personal chat assistance, that give you precise outputs while mainting your privacy.",
    icon: <ImagePlus />,
    link: "/dashboard/ai-chat",
  },
  {
    title: "Summarizer",
    description:
      "Create easy to understand summaries from websites and long texts.",
    icon: <Book />,
    link: "/dashboard/summarizer",
  },
];
const Body = () => {
  return (
    <div className="grid md:grid-cols-2 sm:p-10 gap-4">
      {cardsData.map((card, index) => (
        <Link href={card.link} className="w-full h-full" key={index}>
          <Card className=" shadow-sm cursor-pointer w-full h-full hover:bg-muted transition-colors ">
            <CardHeader className="px-6 py-4">
              <CardTitle className="sm:text-xl text-lg">
                <div className="flex space-x-2 items-center">
                  {card.icon}
                  <p>{card.title}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="sm:text-md text-sm">{card.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Body;
