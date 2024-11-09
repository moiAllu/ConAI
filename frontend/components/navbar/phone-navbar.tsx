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
import { Nav } from "@/app/dashboard/components/nav";
import { ThemeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import { LucideIcon, Settings } from "lucide-react";

import { useMeStore } from "@/app/dashboard/store";
import { logOutUser } from "@/lib/apicalls/user";
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
      return;
    }
  };
  return (
    <div className="sm:hidden flex items-center justify-between w-full h-full px-2 ">
      <Drawer direction="left">
        <DrawerTrigger>
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="w-full h-full overflow-auto">
          <div className="w-full flex left-0 justify-between p-2">
            <Logo width={60} height={60} />
            <DrawerTrigger>
              <X size={17} />
            </DrawerTrigger>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col space-y-1 mt-2">
            {topLinks.map((link, itx) => (
              <Link
                key={itx}
                href={link.href}
                passHref
                className=" flex items-center space-x-2 text-sm ml-6 hover:bg-muted"
              >
                <DrawerTrigger>
                  <Button
                    variant={pathname === link.href ? "default" : "ghost"}
                    className="space-x-1"
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.title}</span>
                  </Button>
                </DrawerTrigger>
              </Link>
            ))}
          </div>
          <div className="p-2 ">
            <span className="text-md font-semibold ">Tools</span>
          </div>
          <div className="flex flex-col space-y-1">
            {toolsLinks.map((link, itx) => (
              <Link
                key={itx}
                href={link.href}
                passHref
                className=" flex items-center space-x-2 text-sm ml-6 hover:bg-muted"
              >
                <DrawerTrigger>
                  <Button
                    variant={pathname === link.href ? "default" : "ghost"}
                    className="space-x-1"
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.title}</span>
                  </Button>
                </DrawerTrigger>
              </Link>
            ))}
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col ">
            {links.map((link, itx) => (
              <Link
                key={itx}
                href={link.href}
                passHref
                className=" flex items-center space-x-2 text-sm ml-6 hover:bg-muted"
              >
                <DrawerTrigger>
                  <Button className="space-x-1" variant="link">
                    <link.icon className="h-5 w-5" />
                    <span>{link.title}</span>
                  </Button>
                </DrawerTrigger>
              </Link>
            ))}
          </div>
          <Separator className="my-2" />
          {!name && (
            <Link href="/login" className="w-full flex">
              <DrawerTrigger>
                <Button className="m-2">Log in</Button>
              </DrawerTrigger>
            </Link>
          )}
          {name && (
            <DrawerTrigger className="flex w-full flex-col justify-between h-full p-2 space-y-1">
              <Link
                href="/forms"
                className="flex text-sm p-2 ml-4 items-center space-x-1"
              >
                <Settings size={17} />
                <span>Settings</span>
              </Link>
              <Button
                className=" w-full flex items-center gap-2 p-2 border rounded-lg mb-5"
                variant="destructive"
                onClick={logOutHandler}
              >
                {"Logout"}
              </Button>
            </DrawerTrigger>
          )}
        </DrawerContent>
      </Drawer>
      <Logo width={60} height={60} />
      <ThemeToggle />
    </div>
  );
};

export default PhoneNavbar;
