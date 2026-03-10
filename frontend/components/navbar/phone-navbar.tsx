import React from "react";
import {
  Inbox,
  SquarePen,
  ReceiptText,
  Image,
  Siren,
  MessageSquareMore,
  BookText,
  X,
  Menu,
  HandCoins,
  Contact,
  SearchSlash,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Separator } from "../ui/separator";
import Logo from "./logo";
import { ThemeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";
import { LucideIcon, Settings } from "lucide-react";

import { useMeStore } from "@/app/dashboard/store";
import { logOutUser } from "@/lib/apicalls/user";

const DASHBOARD_FEATURES: { path: string; label: string; icon: LucideIcon }[] = [
  { path: "/dashboard/rewrite", label: "Rewrite", icon: SquarePen },
  { path: "/dashboard/ai-writing", label: "AI Writing", icon: ReceiptText },
  { path: "/dashboard/image-generator", label: "Image Generator", icon: Image },
  { path: "/dashboard/content-detector", label: "Content Detector", icon: Siren },
  { path: "/dashboard/ai-chat", label: "AI Chat", icon: MessageSquareMore },
  { path: "/dashboard/summarizer", label: "Summarizer", icon: BookText },
];
function getFeatureForPath(pathname: string) {
  return DASHBOARD_FEATURES.find((f) => pathname === f.path || pathname.startsWith(f.path + "/"));
}
type typeLink = {
  title: string;
  icon: LucideIcon;
  href: string;
};
type typeUserData = {
  title: string;
  image: string;
};

const links: typeLink[] = [
  {
    title: "Pricing",
    icon: HandCoins,
    href: "/",
  },
  {
    title: "About us",
    icon: SearchSlash,
    href: "/",
  },
  {
    title: "Contact us",
    icon: Contact,
    href: "/",
  },
];
const topLinks = [
  {
    title: "Dashboard",
    icon: Inbox,
    href: "/dashboard",
  },
  {
    title: "Rewrite",
    icon: SquarePen,
    href: "/dashboard/rewrite",
  },
  {
    title: "AI Writing",
    icon: ReceiptText,
    href: "/dashboard/ai-writing",
  },
];
const toolsLinks = [
  {
    title: "Image Generator",
    icon: Image,
    href: "/dashboard/image-generator",
  },
  {
    title: "Content Detector",
    icon: Siren,
    href: "/dashboard/content-detector",
  },
  {
    title: "AI Chat",
    icon: MessageSquareMore,
    href: "/dashboard/ai-chat",
  },
  {
    title: "Summarizer",
    icon: BookText,
    href: "/dashboard/summarizer",
  },
];

const PhoneNavbar = () => {
  const pathname = usePathname();
  const { name, avatar } = useMeStore();
  const logOutHandler = async () => {
    const response = await logOutUser();
    if (response.status === 200) {
      window.location.href = "/login";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("aiChatStore");
      localStorage.removeItem("aiWritingStore");
      localStorage.removeItem("rewriteStore");
      localStorage.removeItem("summarizerStore");
      localStorage.removeItem("imageStore");
      localStorage.removeItem("content-detector");
      localStorage.removeItem("meStore");
      localStorage.removeItem("subscriptionStore");
      localStorage.removeItem("chatStore");
      localStorage.removeItem("planStore");
      return;
    }
  };
  const feature = getFeatureForPath(pathname);

  return (
    <div className="flex w-full items-center justify-between gap-2 sm:hidden">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-lg -ml-1">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full w-full max-w-[280px] overflow-auto border-r border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-4">
            <Link href="/" className="shrink-0">
              <Logo width={56} height={56} />
            </Link>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <X className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4">
            <div className="flex flex-col gap-0.5">
              {topLinks.map((link, itx) => (
                <Link key={itx} href={link.href} passHref>
                  <DrawerTrigger asChild>
                    <Button
                      variant={pathname === link.href ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3 rounded-xl"
                    >
                      <link.icon className="h-4 w-4 shrink-0" />
                      <span className="text-sm font-medium">{link.title}</span>
                    </Button>
                  </DrawerTrigger>
                </Link>
              ))}
            </div>
            <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tools
            </p>
            <div className="flex flex-col gap-0.5">
              {toolsLinks.map((link, itx) => (
                <Link key={itx} href={link.href} passHref>
                  <DrawerTrigger asChild>
                    <Button
                      variant={pathname === link.href ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3 rounded-xl"
                    >
                      <link.icon className="h-4 w-4 shrink-0" />
                      <span className="text-sm font-medium">{link.title}</span>
                    </Button>
                  </DrawerTrigger>
                </Link>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-0.5">
              {links.map((link, itx) => (
                <Link key={itx} href={link.href} passHref>
                  <DrawerTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 rounded-xl text-muted-foreground"
                    >
                      <link.icon className="h-4 w-4 shrink-0" />
                      <span className="text-sm">{link.title}</span>
                    </Button>
                  </DrawerTrigger>
                </Link>
              ))}
            </div>
          </nav>
          <div className="border-t border-border/50 p-4">
            {!name && (
              <DrawerTrigger asChild>
                <Button asChild className="w-full rounded-xl" size="lg">
                  <Link href="/login">Log in</Link>
                </Button>
              </DrawerTrigger>
            )}
            {name && (
              <div className="flex flex-col gap-2">
                <Button asChild variant="ghost" className="w-full justify-start gap-3 rounded-xl" size="sm">
                  <Link href="/forms">
                    <DrawerTrigger asChild>
                      <>
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </>
                    </DrawerTrigger>
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  className="w-full rounded-xl"
                  onClick={logOutHandler}
                >
                  Log out
                </Button>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
      <div className="flex min-w-0 flex-1 justify-center">
        {feature ? (
          <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/30 px-3 py-1.5">
            <feature.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate text-sm font-semibold">{feature.label}</span>
          </div>
        ) : (
          <Link href="/" className="shrink-0">
            <Logo width={48} height={48} />
          </Link>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default PhoneNavbar;
