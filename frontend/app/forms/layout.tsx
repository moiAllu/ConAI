"use client";
import { useEffect } from "react";
import { useMeStore, useSubscriptionStore } from "@/app/dashboard/store";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

import { Separator } from "@/registry/new-york/ui/separator";
import { SidebarNav } from "@/app/forms/components/sidebar-nav";
import ResizeableSidebar from "@/app/dashboard/components/resizeable-sidebar";
import Link from "next/link";
import { getMe } from "@/lib/apicalls/user";
import { getUserSubscriptionDetails } from "@/lib/apicalls/subcriptionPlans";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/forms",
  },
  // {
  //   title: "Account",
  //   href: "/forms/account",
  // },
  {
    title: "Billing",
    href: "/forms/billing",
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
  const { setUser, _id } = useMeStore();
  const { userSubscription, setUserSubscription } = useSubscriptionStore();
  useEffect(() => {
    const setUserToState = async () => {
      const user = await getMe();
      if (user.status === 200) {
        setUser(user.user);
      }
    };
    setUserToState();
  }, []);
  useEffect(() => {
    const userSubscriptionDetail = async () => {
      const userSubscriptionDetail = await getUserSubscriptionDetails(_id);
      if (userSubscriptionDetail.status === 200) {
        setUserSubscription(userSubscriptionDetail.data);
      }
    };
    userSubscriptionDetail();
  }, [_id]);
  return (
    <>
      <div className="space-y-6 p-5 pb-16 md:block w-full md:mx-auto max-w-[1080px] overflow-hidden">
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
            <SidebarNav
              items={
                userSubscription.stripe_subscription_id
                  ? sidebarNavItems.filter((item) => item.title !== "Plans")
                  : sidebarNavItems
              }
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
