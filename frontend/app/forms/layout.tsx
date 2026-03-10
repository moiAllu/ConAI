"use client";

import { useEffect } from "react";
import {
  useMeStore,
  useSubscriptionStore,
  useStripeCustomerDetailStore,
} from "@/app/dashboard/store";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/registry/new-york/ui/separator";
import { SidebarNav } from "@/app/forms/components/sidebar-nav";
import Link from "next/link";
import { getMe } from "@/lib/apicalls/user";
import { getUserSubscriptionDetails } from "@/lib/apicalls/subcriptionPlans";
import { getStripeCustomerDetailById } from "@/lib/apicalls/srtipe-customer-detail";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/forms",
  },
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
  { title: "Devices", href: "/forms/devices" },
  { title: "Plans", href: "/forms/plans" },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { setUser, _id } = useMeStore();
  const { userSubscription, setUserSubscription } = useSubscriptionStore();
  const { setStripeCustomerDetail } = useStripeCustomerDetailStore();

  useEffect(() => {
    const setUserToState = async () => {
      const user = await getMe();
      if (user.status === 401) {
        const { logOutUser } = await import("@/lib/apicalls/user");
        await logOutUser();
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
        return;
      }
      if (user.status === 200) {
        setUser(user.user);
      }
    };
    setUserToState();
  }, [setUser]);

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
    if (_id) {
      userSubscriptionDetail();
    }
  }, [_id, setStripeCustomerDetail, setUserSubscription]);

  const items = userSubscription.stripe_subscription_id
    ? sidebarNavItems.filter((item) => item.title !== "Plans")
    : sidebarNavItems;

  return (
    <div className="flex h-screen min-h-0 w-full flex-col overflow-hidden bg-gradient-to-br from-slate-200 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 px-3 py-4 sm:px-4 sm:py-6 md:px-6">
        <div className="flex min-h-0 w-full flex-1 flex-col rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm backdrop-blur-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-muted/40 text-muted-foreground hover:bg-muted/70"
                aria-label="Back to dashboard"
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Settings
                </h2>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Manage your account, billing, and notifications.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4 sm:my-6" />

          <div className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row lg:gap-10">
            <aside className="lg:w-56 shrink-0">
              <SidebarNav items={items} />
            </aside>
            <div className="min-h-0 flex-1 overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
