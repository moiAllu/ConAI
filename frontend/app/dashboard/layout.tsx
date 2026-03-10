"use client";
import { Metadata } from "next";
// import { cookies } from "next/headers";
import React, { use, useEffect } from "react";
import ResizeableSidebar from "./components/resizeable-sidebar";
import {
  useMeStore,
  useSubscriptionStore,
  useStripeCustomerDetailStore,
} from "@/app/dashboard/store";
import { useWindowSize } from "@/lib/hooks";
import { Navbar } from "@/components/navbar/NavBar";
import { getMe, logOutUser } from "@/lib/apicalls/user";
import { getUserSubscriptionDetails } from "@/lib/apicalls/subcriptionPlans";
import { getStripeCustomerDetailById } from "@/lib/apicalls/srtipe-customer-detail";
import { getOrCreateDeviceId, getDeviceName } from "@/lib/helper/deviceId";

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// };

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: SettingsLayoutProps) {
  const isPhone = useWindowSize().width < 640;
  const { _id } = useMeStore();
  const { setUserSubscription } = useSubscriptionStore();
  const { setStripeCustomerDetail } = useStripeCustomerDetailStore();
  const { setUser } = useMeStore();
  useEffect(() => {
    const setUserToState = async () => {
      const user = await getMe();
      if (user.status === 401) {
        await logOutUser();
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
        return;
      }
      if (user.status === 200) {
        setUser(user.user);
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        if (token) {
          const deviceId = getOrCreateDeviceId();
          fetch("/api/auth/register-device", {
            method: "POST",
            headers: { "Content-Type": "application/json", accessToken: token },
            body: JSON.stringify({
              deviceId,
              name: getDeviceName(),
              userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
            }),
          }).then((r) => r.json()).then((d) => {
            if (d.token && typeof window !== "undefined") localStorage.setItem("accessToken", d.token);
          }).catch(() => {});
        }
      }
    };
    setUserToState();
  }, []);
  useEffect(() => {
    const userSubscriptionDetail = async () => {
      const userSubscriptionDetail = await getUserSubscriptionDetails(_id);
      const stripeCustomerDetail = await getStripeCustomerDetailById(_id);
      if (userSubscriptionDetail.status === 200) {
        setUserSubscription(userSubscriptionDetail.data);
      }
      if (stripeCustomerDetail.status === 200) {
        setStripeCustomerDetail(stripeCustomerDetail.data);
      }
    };
    userSubscriptionDetail();
  }, [_id]);
  const defaultLayout = undefined;
  const defaultCollapsed = true;
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden sm:h-screen sm:max-h-[1080px] sm:max-w-[1920px]">
      {isPhone ? (
        <>
          <Navbar />
          <main className="min-h-0 flex-1 overflow-auto">{children}</main>
        </>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
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
