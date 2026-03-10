"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useIsLoggedIn } from "@/lib/hooks";
import { featuresList, colorMap, featureDashboardRoutes } from "./config";
import { containerVariants } from "./variants";
import { FeatureTabs } from "./FeatureTabs";
import { FeatureContent } from "./FeatureContent";

export type { FeatureItem } from "./types";
export { featuresList } from "./config";

export default function FeaturesSection() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const [activeIndex, setActiveIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const active = featuresList[activeIndex];
  const hasContent = inputValue.trim().length > 0;

  useEffect(() => {
    setInputValue("");
  }, [activeIndex]);

  const handleSubmit = () => {
    if (!hasContent) return;
    if (!isLoggedIn) {
      const redirect = featureDashboardRoutes[activeIndex] ?? "/dashboard";
      router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
      return;
    }
    router.push(featureDashboardRoutes[activeIndex] ?? "/dashboard");
  };

  return (
    <section
      id="features"
      className="w-full flex flex-col px-4 sm:px-6 md:px-10 py-8 sm:py-12 justify-center items-center scroll-mt-20"
    >
      <motion.div
        className="w-full max-w-6xl 2xl:max-w-7xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg ring-1 ring-primary/10 dark:ring-white/10 bg-card/80 dark:bg-card/90 backdrop-blur-xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[560px]">
          <FeatureTabs activeIndex={activeIndex} onSelect={setActiveIndex} />
          <FeatureContent
            active={active}
            activeIndex={activeIndex}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleSubmit}
          />
        </div>
      </motion.div>
    </section>
  );
}
