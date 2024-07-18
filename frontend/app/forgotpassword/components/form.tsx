"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";
import { useWindowSize } from "@/lib/hooks";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const isPhone = useWindowSize().width < 640;
  const formSubmitHandler = async (e: any) => {
    e.preventDefault;
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/forgot-password",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        console.log("Email sent");
        setSuccess(data.message);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError("Internal server error");
    }
  };
  if (isPhone) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        {!success ? (
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email below, A verification link will be sent to your
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={formSubmitHandler}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${error && " border-red-700"}`}
                    required
                  />
                  <Link
                    href="/login"
                    className="ml-auto inline-block text-sm underline"
                  >
                    login
                  </Link>
                </div>
                <Button type="submit" className="w-full flex items-center">
                  <span>Submit</span>
                  {loading && <LoadingSpinner />}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Email Sent</CardTitle>
              <CardDescription>
                A verification link has been sent to your email. Please check
                your email to reset your password.
              </CardDescription>
              <Link
                href="/login"
                className="ml-auto inline-block text-sm underline"
              >
                login
              </Link>
            </CardHeader>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-center items-center space-x-4">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below, A verification link will be sent to your
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${error && " border-red-700"}`}
                required
              />
              <Link
                href="/login"
                className="ml-auto inline-block text-sm underline"
              >
                login
              </Link>
            </div>
            <Button type="submit" className="w-full flex items-center">
              <span>Submit</span>
              {loading && <LoadingSpinner />}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      {success && (
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Email Sent</CardTitle>
            <CardDescription>
              A verification link has been sent to your email. Please check your
              email to reset your password.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
