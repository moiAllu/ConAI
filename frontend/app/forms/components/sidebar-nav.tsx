"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex gap-1 overflow-x-auto pb-4 sm:pb-2 lg:flex-col lg:overflow-visible",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "relative inline-flex h-9 items-center whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-all duration-200",
            pathname === item.href
              ? "bg-primary/10 text-primary before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:rounded-full before:bg-primary before:content-['']"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
