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
import { LucideIcon } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMeStore } from "@/app/dashboard/store";
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
const PhoneNavbar = () => {
  const pathname = usePathname();
  const { name, avatar } = useMeStore();
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
          <Nav
            isCollapsed={false}
            links={[
              {
                title: "Dashboard",
                icon: Inbox,
                variant: pathname === "/dashboard" ? "default" : "ghost",
                href: "/dashboard",
              },
              {
                title: "Rewrite",
                label: "",
                icon: SquarePen,
                variant:
                  pathname === "/dashboard/rewrite" ? "default" : "ghost",

                href: "/dashboard/rewrite",
              },
              {
                title: "AI Writing",
                label: "",
                icon: ReceiptText,
                variant:
                  pathname === "/dashboard/ai-writing" ? "default" : "ghost",
                href: "/dashboard/ai-writing",
              },
            ]}
          />
          <div className="px-2 ">
            <span className="text-md font-semibold ">Tools</span>
          </div>
          <Nav
            isCollapsed={false}
            links={[
              {
                title: "Image Generator",
                label: "",
                icon: Image,
                variant:
                  pathname === "/dashboard/image-generator"
                    ? "default"
                    : "ghost",
                href: "/dashboard/image-generator",
              },
              {
                title: "Content Detector",
                label: "",
                icon: Siren,
                variant:
                  pathname === "/dashboard/content-detector"
                    ? "default"
                    : "ghost",
                href: "/dashboard/content-detector",
              },
              {
                title: "AI Chat",
                label: "",
                icon: MessageSquareMore,
                variant:
                  pathname === "/dashboard/ai-chat" ? "default" : "ghost",
                href: "/dashboard/ai-chat",
              },
              {
                title: "Summarizer",
                label: "",
                icon: BookText,
                variant:
                  pathname === "/dashboard/summarizer" ? "default" : "ghost",
                href: "/dashboard/summarizer",
              },
            ]}
          />
          <Separator className="my-2" />
          <div className="flex flex-col space-y-4 p-2">
            {links.map((link) => (
              <Link
                href={link.href}
                passHref
                className=" flex items-center space-x-2 text-sm ml-6"
              >
                <link.icon className="h-5 w-5" />
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
          <Separator className="my-2" />
          {!name && (
            <Link href="/login" className="w-full flex">
              <Button className="m-2">Log in</Button>
            </Link>
          )}
          {name && (
            <div className="flex w-full flex-col justify-end h-full p-2 space-y-1">
              <Link href="/forms" className="flex text-sm p-2 ml-4">
                <span>Settings</span>
              </Link>
              <Link
                className=" w-full flex items-center gap-2 p-2 border rounded-lg mb-5"
                href="/forms/account"
              >
                <Avatar className="border border-violet-800">
                  <AvatarImage src={avatar} alt="Avatar" />
                  <AvatarFallback>
                    {!avatar && name.charAt(0) + name.charAt(1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold ">{name}</span>
                  <span className="text-xs text-gray-500">Admin</span>
                </div>
              </Link>
            </div>
          )}
        </DrawerContent>
      </Drawer>
      <Logo width={60} height={60} />
      <ThemeToggle />
    </div>
  );
};

export default PhoneNavbar;
