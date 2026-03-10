"use client";

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
  FormMessage,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { toast, Toaster } from "sonner";
import { useMeStore } from "../dashboard/store";
import { updateUserApi } from "@/lib/apicalls/auth";
import { useState } from "react";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "Software Engineer",
  urls: [{ value: "https://conAI.com" }],
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const { name, email, updateUser } = useMeStore();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    const updatedUser = await updateUserApi(email, data.username, data.bio);
    if (updatedUser.status === 200) {
      updateUser({
        name: updatedUser.data.username,
        bio: updatedUser.data.bio,
      } as any);
      toast.success("User updated successfully");
      setIsLoading(false);
      return;
    }
    toast.error("Failed to update user");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder={name}
                    className="rounded-xl border-border/50 bg-background"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  This is your public display name. It can be your real name or a
                  pseudonym. You can only change this once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="min-h-[100px] resize-y rounded-xl border-border/50 bg-background text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          {isLoading ? "Updating…" : "Update profile"}
        </Button>
      </form>
    </Form>
  );
}
