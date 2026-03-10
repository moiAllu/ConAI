import {
  ScanSearch,
  UserCircle,
  PenLine,
  FileSearch,
  ImagePlus,
  Sparkles,
} from "lucide-react";
import type { FeatureItem, FeatureColorMap } from "./types";

export const featuresList: FeatureItem[] = [
  {
    title: "AI Detect",
    description:
      "Identify AI-generated content with accuracy. Know when text is machine-written.",
    icon: ScanSearch,
    color: "violet",
    inputType: "textarea",
    placeholder: "Paste text here to analyze for AI-generated content...",
    label: "Text to analyze",
  },
  {
    title: "Humanizer",
    description:
      "Make AI text sound more natural and human. Transform robotic phrasing into flowing copy.",
    icon: UserCircle,
    color: "indigo",
    inputType: "textarea",
    placeholder: "Paste AI-written text to humanize...",
    label: "Text to humanize",
  },
  {
    title: "Rewriter",
    description:
      "Rephrase and improve your writing instantly. Get multiple variations on-brand.",
    icon: PenLine,
    color: "blue",
    inputType: "textarea",
    placeholder: "Enter or paste text to rewrite...",
    label: "Text to rewrite",
  },
  {
    title: "Check Plagiarism",
    description:
      "Ensure originality with thorough plagiarism checks and clear reports.",
    icon: FileSearch,
    color: "cyan",
    inputType: "textarea",
    placeholder: "Paste text to check for plagiarism...",
    label: "Text to check",
  },
  {
    title: "Generate Image",
    description:
      "Create images from text with AI. Describe what you need and get visuals in seconds.",
    icon: ImagePlus,
    color: "teal",
    inputType: "input",
    placeholder: "Describe the image you want to generate...",
    label: "Image prompt",
  },
  {
    title: "Enhance Image",
    description:
      "Upscale and enhance image quality with AI. Sharpen details and bring images to life.",
    icon: Sparkles,
    color: "emerald",
    inputType: "input",
    placeholder: "Paste image URL to enhance or describe enhancements...",
    label: "Image URL or instructions",
  },
];

export const colorMap: FeatureColorMap = {
  violet: {
    tab: "hover:bg-violet-500/10 hover:border-violet-400/30 data-[active]:border-violet-400 data-[active]:bg-violet-500/15",
    tabActive: "border-violet-400 bg-violet-500/15",
    content:
      "bg-gradient-to-br from-violet-500/10 via-transparent to-transparent border-violet-400/20",
    icon: "text-violet-500",
  },
  indigo: {
    tab: "hover:bg-indigo-500/10 hover:border-indigo-400/30 data-[active]:border-indigo-400 data-[active]:bg-indigo-500/15",
    tabActive: "border-indigo-400 bg-indigo-500/15",
    content:
      "bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border-indigo-400/20",
    icon: "text-indigo-500",
  },
  blue: {
    tab: "hover:bg-blue-500/10 hover:border-blue-400/30 data-[active]:border-blue-400 data-[active]:bg-blue-500/15",
    tabActive: "border-blue-400 bg-blue-500/15",
    content:
      "bg-gradient-to-br from-blue-500/10 via-transparent to-transparent border-blue-400/20",
    icon: "text-blue-500",
  },
  cyan: {
    tab: "hover:bg-cyan-500/10 hover:border-cyan-400/30 data-[active]:border-cyan-400 data-[active]:bg-cyan-500/15",
    tabActive: "border-cyan-400 bg-cyan-500/15",
    content:
      "bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent border-cyan-400/20",
    icon: "text-cyan-500",
  },
  teal: {
    tab: "hover:bg-teal-500/10 hover:border-teal-400/30 data-[active]:border-teal-400 data-[active]:bg-teal-500/15",
    tabActive: "border-teal-400 bg-teal-500/15",
    content:
      "bg-gradient-to-br from-teal-500/10 via-transparent to-transparent border-teal-400/20",
    icon: "text-teal-500",
  },
  emerald: {
    tab: "hover:bg-emerald-500/10 hover:border-emerald-400/30 data-[active]:border-emerald-400 data-[active]:bg-emerald-500/15",
    tabActive: "border-emerald-400 bg-emerald-500/15",
    content:
      "bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border-emerald-400/20",
    icon: "text-emerald-500",
  },
};

export const featureDashboardRoutes: Record<number, string> = {
  0: "/dashboard/content-detector",
  1: "/dashboard/rewrite",
  2: "/dashboard/rewrite",
  3: "/dashboard/content-detector",
  4: "/dashboard/image-generator",
  5: "/dashboard/image-generator",
};

const BAR_COLORS: Record<string, string> = {
  violet: "bg-violet-500",
  indigo: "bg-indigo-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  teal: "bg-teal-500",
  emerald: "bg-emerald-500",
};

export function getBarColor(color: string): string {
  return BAR_COLORS[color] ?? "bg-violet-500";
}
