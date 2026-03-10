"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
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
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { toast } from "@/registry/new-york/ui/use-toast";
import { useTheme } from "next-themes";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
  font: z.enum(["inter", "manrope", "system"], {
    invalid_type_error: "Select a font",
    required_error: "Please select a font.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const defaultValues: Partial<AppearanceFormValues> = {
  theme: "light",
  font: "system",
};

export function AppearanceForm() {
  const { setTheme } = useTheme();
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });
  form.watch((value) => {
    if (value.theme) {
      setTheme(value.theme);
    }
  });

  function onSubmit(data: AppearanceFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium">Theme</FormLabel>
              <FormDescription className="text-xs">
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid max-w-md grid-cols-2 gap-4 pt-1 sm:gap-6"
              >
                <FormItem>
                  <FormLabel
                    className={cn(
                      "cursor-pointer [&:has([data-state=checked])_.theme-card]:border-primary [&:has([data-state=checked])_.theme-card]:ring-2 [&:has([data-state=checked])_.theme-card]:ring-primary/20"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="theme-card rounded-xl border-2 border-border/50 bg-muted/10 p-1.5 transition-all hover:border-border hover:bg-muted/20">
                      <div className="space-y-2 rounded-lg bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 shrink-0 rounded-full bg-[#ecedef]" />
                          <div className="h-2 flex-1 rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 shrink-0 rounded-full bg-[#ecedef]" />
                          <div className="h-2 flex-1 rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                      <span className="mt-2 block w-full text-center text-sm font-medium">
                        Light
                      </span>
                    </div>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel
                    className={cn(
                      "cursor-pointer [&:has([data-state=checked])_.theme-card]:border-primary [&:has([data-state=checked])_.theme-card]:ring-2 [&:has([data-state=checked])_.theme-card]:ring-primary/20"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="theme-card rounded-xl border-2 border-border/50 bg-muted/10 p-1.5 transition-all hover:border-border hover:bg-muted/20">
                      <div className="space-y-2 rounded-lg bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-500" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-500" />
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 shrink-0 rounded-full bg-slate-500" />
                          <div className="h-2 flex-1 rounded-lg bg-slate-500" />
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 shrink-0 rounded-full bg-slate-500" />
                          <div className="h-2 flex-1 rounded-lg bg-slate-500" />
                        </div>
                      </div>
                      <span className="mt-2 block w-full text-center text-sm font-medium">
                        Dark
                      </span>
                    </div>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Update preferences
        </Button>
      </form>
    </Form>
  );
}
