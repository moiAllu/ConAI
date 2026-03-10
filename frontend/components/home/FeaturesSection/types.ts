import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  inputType: "textarea" | "input";
  placeholder: string;
  label?: string;
};

export type FeatureColorMap = Record<
  string,
  { tab: string; tabActive: string; content: string; icon: string }
>;
