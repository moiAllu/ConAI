"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string | "#";
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col data-[collapsed=true]:items-center"
    >
      <nav className="flex w-full flex-col gap-0.5">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-muted/70 hover:text-foreground",
                      link.variant === "default" &&
                        "bg-primary/10 text-primary before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:rounded-full before:bg-primary before:content-[''] hover:bg-primary/15",
                    )}
                  >
                    <link.icon className="h-5 w-5" strokeWidth={2} />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={12}
                  className="rounded-xl border border-border/50 bg-popover px-3 py-2 text-sm font-medium shadow-lg"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-1.5 text-muted-foreground font-normal">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "relative flex h-11 items-center gap-3 rounded-xl pl-3 pr-3 py-2.5 text-sm font-medium transition-all duration-200",
                link.variant === "ghost" &&
                  "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                link.variant === "default" &&
                  "bg-primary/10 text-primary before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:rounded-full before:bg-primary before:content-[''] hover:bg-primary/15",
              )}
            >
              <link.icon className="h-5 w-5 shrink-0" strokeWidth={2} />
              <span className="truncate">{link.title}</span>
              {link.label && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
