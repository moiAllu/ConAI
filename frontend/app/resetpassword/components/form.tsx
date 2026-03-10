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
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { resetPassword } from "@/lib/apicalls/user";

const cardClass =
  "w-full max-w-[420px] border-0 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-slate-950/50 rounded-2xl";

export default function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await resetPassword(password, verifyPassword, token);
      if (data.status === 200) {
        setSuccess(true);
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

  if (success) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <Toaster richColors />
        <Card className={cardClass}>
          <CardHeader className="space-y-1.5 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Password reset
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Your password has been updated. Sign in with your new password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="h-11 w-full rounded-lg font-medium">
              <Link href="/login">Sign in</Link>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Toaster richColors />
      <Card className={cardClass}>
        <CardHeader className="space-y-1.5 pb-6 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Reset password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="grid gap-4" onSubmit={formSubmitHandler}>
            <div className="grid gap-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                className={`h-11 rounded-lg ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="verify-password">Confirm password</Label>
              <Input
                id="verify-password"
                type="password"
                placeholder="••••••••"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                disabled={loading}
                required
                className={`h-11 rounded-lg ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {error && (
              <p className="text-center text-sm text-red-600 dark:text-red-400">
                {error}
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
                  <span className="ml-2">Updating…</span>
                </>
              ) : (
                "Update password"
              )}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
