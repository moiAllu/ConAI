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

export default function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const isPhone = useWindowSize().width < 640;
  const formSubmitHandler = async (e: any) => {
    e.preventDefault;
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/reset-password", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, verifyPassword }),
        method: "POST",
      });
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
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Your password reset request have generated. Enter your new password
            down below
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
    </div>
  );
}
