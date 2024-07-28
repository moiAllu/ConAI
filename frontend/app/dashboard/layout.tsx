"use client";
import { Metadata } from "next";
// import { cookies } from "next/headers";
import React, { use, useEffect } from "react";
import ResizeableSidebar from "./components/resizeable-sidebar";
import { useMeStore } from "@/app/dashboard/store";
import { useWindowSize } from "@/lib/hooks";
import { Navbar } from "@/components/navbar/NavBar";

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
    <div className="w-full h-full">
      {isPhone ? (
        <>
          <Navbar />
          <div className="h-[calc(100vh-60px)] w-full">{children}</div>
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
