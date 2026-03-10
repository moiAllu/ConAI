"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/registry/new-york/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/registry/new-york/ui/form";
import { Switch } from "@/registry/new-york/ui/switch";
import { toast, Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { useMeStore } from "@/app/dashboard/store";

const notificationsFormSchema = z.object({
  communication_emails: z.boolean().default(false),
  marketing_emails: z.boolean().default(false),
  social_emails: z.boolean().default(true),
  security_emails: z.boolean().default(true),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const defaultValues: NotificationsFormValues = {
  communication_emails: false,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
};

export function NotificationsForm() {
  const { notifications, updateUser } = useMeStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (notifications) {
      form.reset({
        communication_emails: notifications.communication_emails ?? false,
        marketing_emails: notifications.marketing_emails ?? false,
        social_emails: notifications.social_emails ?? true,
        security_emails: notifications.security_emails ?? true,
      });
    }
  }, [notifications, form]);

  async function onSubmit(data: NotificationsFormValues) {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please sign in again");
        return;
      }
      const res = await fetch("/api/user/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accessToken: token,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.status === 200 && result.user) {
        updateUser(result.user as any);
        toast.success("Notifications updated");
      } else {
        toast.error(result.message ?? "Failed to update notifications");
      }
    } catch {
      toast.error("Failed to update notifications");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              Email Notifications
            </h4>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="communication_emails"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "flex flex-row items-center justify-between rounded-xl border border-border/40 bg-muted/5 px-4 py-3",
                      "transition-colors hover:bg-muted/10",
                    )}
                  >
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium">
                        Communication emails
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Receive emails about your account activity.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketing_emails"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "flex flex-row items-center justify-between rounded-xl border border-border/40 bg-muted/5 px-4 py-3",
                      "transition-colors hover:bg-muted/10",
                    )}
                  >
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium">
                        Marketing emails
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Receive emails about new products, features, and more.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="security_emails"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "flex flex-row items-center justify-between rounded-xl border border-border/40 bg-muted/5 px-4 py-3",
                      "transition-colors hover:bg-muted/10",
                    )}
                  >
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium">
                        Security emails
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Receive emails about your account activity and security.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="rounded-xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            disabled={isLoading}
          >
            {isLoading ? "Updating…" : "Update notifications"}
          </Button>
        </form>
      </Form>
    </>
  );
}
