"use client";

import React, { useId } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  href?: string;
};

const Logo = ({ width = 100, height = 40, className, href }: LogoProps) => {
  const id = useId().replace(/:/g, "");
  const gradId = `logo-grad-${id}`;
  const gradDarkId = `logo-grad-dark-${id}`;

  const iconSize = Math.min(width, height);
  const isCompact = width <= 60 || height <= 28;

  const content = (
    <>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id={gradDarkId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        {/* Soft circle background */}
        <circle
          cx="16"
          cy="16"
          r="14"
          className="fill-primary/[0.08] dark:fill-primary/[0.15]"
        />
        {/* C shape: ring with gap (light) */}
        <circle
          cx="16"
          cy="16"
          r="9"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="42 12"
          strokeDashoffset="6"
          className="dark:hidden"
        />
        {/* C shape (dark mode – brighter gradient) */}
        <circle
          cx="16"
          cy="16"
          r="9"
          fill="none"
          stroke={`url(#${gradDarkId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="42 12"
          strokeDashoffset="6"
          className="hidden dark:block"
        />
        {/* Sparkle (light) */}
        <circle cx="24" cy="8" r="2.75" fill={`url(#${gradId})`} className="dark:hidden" />
        {/* Sparkle (dark) */}
        <circle cx="24" cy="8" r="2.75" fill={`url(#${gradDarkId})`} className="hidden dark:block" />
      </svg>
      {!isCompact && (
        <span
          className={cn(
            "font-bold tracking-tight text-primary",
            "whitespace-nowrap"
          )}
          style={{ fontSize: `${Math.max(14, height * 0.55)}px`, lineHeight: 1 }}
        >
          Con
          <span
            className={cn(
              "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent",
              "dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400"
            )}
          >
            AI
          </span>
        </span>
      )}
    </>
  );

  const wrapperClass = cn(
    "inline-flex items-center gap-2 rounded-lg transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className
  );

  if (href !== undefined && href !== null) {
    return (
      <Link href={href} className={wrapperClass} aria-label="ConAI home">
        {content}
      </Link>
    );
  }

  return (
    <span className={wrapperClass} style={{ width, height }}>
      {content}
    </span>
  );
};

export default Logo;
