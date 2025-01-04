"use client";
import { Metadata } from "next";
// import { cookies } from "next/headers";
import React, { use, useEffect } from "react";
import ResizeableSidebar from "./components/resizeable-sidebar";
import { useMeStore, useSubscriptionStore } from "@/app/dashboard/store";
import { useWindowSize } from "@/lib/hooks";
import { Navbar } from "@/components/navbar/NavBar";
import { getMe } from "@/lib/apicalls/user";
import { getUserSubscriptionDetails } from "@/lib/apicalls/subcriptionPlans";

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// };

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
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: SettingsLayoutProps) {
  const isPhone = useWindowSize().width < 640;
  const { _id } = useMeStore();
  const { setUserSubscription } = useSubscriptionStore();
  const { setUser } = useMeStore();
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
  const defaultLayout = undefined;
  const defaultCollapsed = true;
  return (
    <div className="w-full h-full">
      {isPhone ? (
        <>
          <Navbar />
          <div className="h-full w-full">{children}</div>
        </>
      ) : (
        <div className="block h-screen w-screen max-h-[1080px] max-w-[1920px]">
          <ResizeableSidebar
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={5}
          >
            {children}
          </ResizeableSidebar>
        </div>
      )}
    </div>
  );
}
