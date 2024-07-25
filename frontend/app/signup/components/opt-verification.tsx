"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface InputOTPFormProps {
  otpRequestGen: any;
  email: string;
}
export function InputOTPForm({ otpRequestGen, email }: InputOTPFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    const otpRequestGen = async () => {
      const otpResponse = await fetch(
        "http://localhost:8000/api/user/otp-request",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          method: "POST",
        }
      );
      const otpRequest = await otpResponse.json();
      console.log(otpRequest);
    };
    otpRequestGen();
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>, e: any) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const otp = data.pin;

    try {
      const response = await fetch(
        "http://localhost:8000/api/user/otp-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email }),
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.status === 200) {
        setSuccess(result.message);
        toast({
          title: "success",
          description: result.message,
        });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} disabled={loading}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="w-full">
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <FormMessage className="w-full">{error}</FormMessage>}
        {success && (
          <FormMessage className="w-full text-green-700 ">
            {success}
          </FormMessage>
        )}

        <Button
          type="submit"
          className=" flex space-x-2 items-center"
          disabled={loading}
          onClick={() => {
            if (loading) {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              });
            }
          }}
        >
          <span> Submit</span>
          {loading && <LoadingSpinner />}
        </Button>
      </form>
    </Form>
  );
}
