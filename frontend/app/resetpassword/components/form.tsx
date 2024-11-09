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
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { resetPassword } from "@/lib/apicalls/user";

export default function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const isPhone = useWindowSize().width < 640;
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await resetPassword(password, verifyPassword, token);
      if (data.status === 200) {
        setSuccess(data.message);
        toast.success(data.message);
      } else {
        setError(data.message);
        toast.error(data.message);
      }
      setLoading(false);
    } catch (e) {
      setError("Internal server error");
      setLoading(false);
      toast.error("Internal server error");
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Toaster richColors />
      {success ? (
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Password Reset</CardTitle>
            <CardDescription>
              <div className="flex flex-col space-y-2">
                <span>
                  {" Click the link below to sign in with your new passowrd."}
                </span>
                <Link href="/login" className="underline text-blue-700 text-lg">
                  Log In
                </Link>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="min-w-sm w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              <div>
                <span>Enter your new password down below</span>
                {error && <div className="text-red-700">{error}</div>}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={formSubmitHandler}>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className={`${error && " border-red-700"}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="verify-password">Verify Password</Label>
                <Input
                  id="verify-password"
                  type="password"
                  placeholder="**********"
                  required
                  className={`${error && " border-red-700 "}`}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full flex items-center">
                <span>Submit</span>
                {loading && <LoadingSpinner />}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/login" className="underline">
                Log In
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
