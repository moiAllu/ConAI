"use client";
import { Metadata } from "next";
// import { cookies } from "next/headers";
import React, { use, useEffect } from "react";
import ResizeableSidebar from "./components/resizeable-sidebar";
import { useMeStore } from "@/app/dashboard/store";

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
  // const layout = cookies().get("react-resizable-panels:layout");
  // const collapsed = cookies().get("react-resizable-panels:collapsed");

  // const defaultLayout = layout ? JSON?.parse(layout.value) : undefined;
  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : false;
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
  const defaultLayout = undefined;
  const defaultCollapsed = true;
  return (
    <div className=" block w-screen h-screen  max-w-[2160px] max-h-[1440px]">
      <ResizeableSidebar
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={5}
      >
        {children}
      </ResizeableSidebar>
    </div>
  );
}
