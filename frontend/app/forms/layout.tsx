"use client";
import { useEffect } from "react";
import { useMeStore } from "@/app/dashboard/store";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

import { Separator } from "@/registry/new-york/ui/separator";
import { SidebarNav } from "@/app/forms/components/sidebar-nav";
import ResizeableSidebar from "@/app/dashboard/components/resizeable-sidebar";
import Link from "next/link";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/forms",
  },
  {
    title: "Account",
    href: "/forms/account",
  },
  {
    title: "Appearance",
    href: "/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/forms/notifications",
  },
  {
    title: "Subscription",
    href: "/forms/subscription",
  },
  { title: "Plans", href: "/forms/plans" },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { setUser } = useMeStore();
  useEffect(() => {
    const setUserToState = async () => {
      const user = await fetch("http://localhost:8000/api/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
        credentials: "include",
      });
      const data = await user.json();
      if (data.status === 200) {
        setUser(data.user);
      }
    };
    setUserToState();
  }, []);
  return (
    <>
      <div className="space-y-6 p-5 pb-16 md:block w-full md:mx-20 max-w-[1440px]">
        <div className="space-y-0.5">
          <div className="flex justify-items-center space-x-4 items-center sm:py-4">
            <Link href="/dashboard">
              <ChevronLeft />
            </Link>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          </div>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
