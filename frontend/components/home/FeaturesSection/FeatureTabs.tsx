"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { featuresList, colorMap, getBarColor } from "./config";
import { tabItemVariants } from "./variants";
import type { FeatureItem } from "./types";

type FeatureTabsProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function FeatureTabs({ activeIndex, onSelect }: FeatureTabsProps) {
  return (
    <div className="lg:w-[300px] xl:w-[340px] shrink-0 border-b lg:border-b-0 lg:border-r border-border/80 bg-muted/20 dark:bg-muted/10 p-3 sm:p-4 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible scrollbar-none">
      {featuresList.map((feature: FeatureItem, i: number) => {
        const isActive = activeIndex === i;
        const c = colorMap[feature.color];
        return (
          <motion.button
            key={feature.title}
            type="button"
            custom={i}
            variants={tabItemVariants}
            onClick={() => onSelect(i)}
            data-active={isActive ? "" : undefined}
            className={cn(
              "relative flex items-center gap-3 pl-5 pr-4 py-3.5 rounded-xl border text-left transition-all duration-200 whitespace-nowrap shrink-0 overflow-hidden",
              c?.tab,
              isActive && c?.tabActive,
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-r-full transition-opacity",
                getBarColor(feature.color),
                isActive ? "opacity-100" : "opacity-40",
              )}
            />
            <feature.icon
              className={cn(
                "h-6 w-6 shrink-0 relative z-0",
                isActive ? c?.icon : "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                "font-semibold text-base relative z-0",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {feature.title}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
