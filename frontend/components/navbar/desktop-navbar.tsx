import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Logo from "./logo";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";

const navSections = [
  { title: "Get Started", href: "/#hero" },
  { title: "Features", href: "/#features" },
  { title: "Models", href: "/#models" },
  { title: "Plans", href: "/#plans" },
];

const DesktopNavbar = () => {
  return (
    <div className="hidden h-full w-full items-center justify-between gap-8 sm:flex">
      <Link href="/" className="shrink-0">
        <Logo />
      </Link>
      <NavigationMenu className="max-w-max">
        <NavigationMenuList className="gap-1">
          {navSections.map((section) => (
            <NavigationMenuItem key={section.title}>
              <Link href={section.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors",
                    "hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  {section.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex shrink-0 items-center gap-3">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Link href="/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" className="rounded-xl shadow-md shadow-primary/10">
          <Link href="/dashboard">Get Started</Link>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default DesktopNavbar;
