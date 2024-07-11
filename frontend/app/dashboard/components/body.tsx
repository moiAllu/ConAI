import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Inbox,
  BookText,
  Siren,
  MessageSquareMore,
  Image,
  Book,
} from "lucide-react";

import Link from "next/link";
const cardsData = [
  {
    title: "Rewriter",
    description:
      "Effortlessly enhance your articles, blog posts, essays, or any text, maintaining original meaning.",
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
      "Feel confident your text isn't detectable by AI with our 95% accurate AI Content Detector. Protect your privacy and intellectual property.",
    icon: <Siren />,
    link: "/dashboard/image-generator",
  },
  {
    title: "AI Content Detector",
    description:
      "Elevate Your Conversations: Empower Your Chats with Cutting-edge AI and Real-time Google Insights!",
    icon: <MessageSquareMore />,
    link: "/dashboard/content-detector",
  },
  {
    title: "AI Chat",
    description:
      "Create easy to understand summaries from websites and long texts.",
    icon: <Image />,
    link: "/dashboard/aichat",
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
      {cardsData.map((card) => (
        <Link href={card.link} className="w-full h-full">
          <Card className=" shadow-sm cursor-pointer w-full h-full">
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-xl">
                <div className="flex space-x-2 items-center">
                  {card.icon}
                  <p>{card.title}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-md">{card.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Body;
