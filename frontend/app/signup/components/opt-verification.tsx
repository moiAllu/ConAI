"use client";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMeStore } from "@/app/dashboard/store";

const FormSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});

interface InputOTPFormProps {
  email: string;
  otpRequestGen?: boolean;
}

const OTP_TIMER_INTERVAL = 60;

export function InputOTPForm({ email, otpRequestGen }: InputOTPFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [otpLoading, setOtpLoading] = React.useState(false);
  const otpSentRef = useRef(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [timer, setTimer] = React.useState(OTP_TIMER_INTERVAL);
  const [canResend, setCanResend] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { setVerified } = useMeStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  const handleOtpRequest = async () => {
    try {
      setOtpLoading(true);
      const otpResponse = await fetch("/api/auth/request-otp", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        method: "POST",
      });
      const otpRequest = await otpResponse.json();
      if (otpRequest.status === 200) {
        toast({ title: "Success", description: otpRequest.message });
        otpSentRef.current = true;
        localStorage.setItem("otpSent", "true");
        const newExpirationTime = Math.floor(Date.now() / 1000) + 60;
        localStorage.setItem("otpTimer", newExpirationTime.toString());
        setTimer(OTP_TIMER_INTERVAL);
        setCanResend(false);
        setOtpLoading(false);
        return;
      }
      toast({ title: "Error", description: "Something went wrong." });
      setOtpLoading(false);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send OTP",
        variant: "destructive",
      });
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    const savedOtpSent = localStorage.getItem("otpSent");
    const savedTimer = localStorage.getItem("otpTimer");
    if (savedOtpSent) {
      otpSentRef.current = true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = savedTimer
      ? Math.max(0, parseInt(savedTimer) - currentTime)
      : 0;

    if (timeLeft > 0) {
      setTimer(timeLeft);
      setCanResend(false);
    } else {
      setCanResend(true);
    }

    if (!savedOtpSent) {
      handleOtpRequest();
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setCanResend(true);
          clearInterval(intervalId);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setError("");
    setSuccess("");
    setLoading(true);
    const otp = data.pin;

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_CONAI_BACKEND_URL || "https://api.conai.me"
        }/api/user/otp-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, email }),
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result.status === 200) {
        localStorage.removeItem("otpSent");
        localStorage.removeItem("otpTimer");
        setVerified(true);
        setSuccess(result.message);
        localStorage.setItem("accessToken", result.token);
        toast({ title: "Success", description: result.message });
        router.push("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (e) {
      console.log(e);
      setError("Internal server error");
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-5"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Verification code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  disabled={loading}
                  containerClassName="justify-center gap-2"
                >
                  <InputOTPGroup className="rounded-lg">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="text-muted-foreground">
                Enter the code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-lg border-slate-200 font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/80"
          disabled={!canResend || otpLoading}
          onClick={handleOtpRequest}
        >
          {otpLoading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Sending…</span>
            </>
          ) : canResend ? (
            "Resend code"
          ) : (
            `Resend code in ${timer}s`
          )}
        </Button>

        {error && (
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {success && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">
            {success}
          </p>
        )}

        <Button
          type="submit"
          className="h-11 w-full rounded-lg font-medium"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Verifying…</span>
            </>
          ) : (
            "Verify email"
          )}
        </Button>
      </form>
    </Form>
  );
}
