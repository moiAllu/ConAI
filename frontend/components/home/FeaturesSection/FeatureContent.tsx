"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { colorMap } from "./config";
import { contentVariants } from "./variants";
import type { FeatureItem } from "./types";

type FeatureContentProps = {
  active: FeatureItem;
  activeIndex: number;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
};

export function FeatureContent({
  active,
  activeIndex,
  inputValue,
  onInputChange,
  onSubmit,
}: FeatureContentProps) {
  const colors = colorMap[active.color] ?? colorMap.violet;
  const hasContent = inputValue.trim().length > 0;

  return (
    <div
      className={cn(
        "flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-14 border-t lg:border-t-0 border-border/80 rounded-b-2xl sm:rounded-b-3xl lg:rounded-none min-h-[380px]",
        colors.content,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col w-full max-w-xl mx-auto"
        >
          <div className="mb-5 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1.5">
              {active.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {active.description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2.5">
              {active.label && (
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {active.label}
                </label>
              )}
              {active.inputType === "textarea" ? (
                <Textarea
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={active.placeholder}
                  className="min-h-[180px] sm:min-h-[220px] text-sm sm:text-base py-3.5 px-4 rounded-xl resize-none border border-border/80 bg-background/60 focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-muted-foreground/70"
                  rows={8}
                />
              ) : (
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={active.placeholder}
                  className="h-12 sm:h-14 text-sm sm:text-base py-3.5 px-4 rounded-xl border border-border/80 bg-background/60 focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-muted-foreground/70"
                />
              )}
            </div>
            <motion.div
              className="flex justify-end"
              initial={false}
              animate={{
                opacity: hasContent ? 1 : 0.7,
                scale: hasContent ? 1 : 0.98,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                size="lg"
                disabled={!hasContent}
                onClick={onSubmit}
                className={cn(
                  "rounded-xl gap-2 shadow-md transition-all duration-200",
                  hasContent &&
                    "shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02]",
                )}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
