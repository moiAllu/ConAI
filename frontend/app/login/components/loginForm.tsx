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
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/loading-spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useMeStore } from "@/app/dashboard/store";
import { GoogleIcon } from "@/components/icons/google-icon";
import { getOrCreateDeviceId, getDeviceName } from "@/lib/helper/deviceId";

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  google_denied: "You denied access. Please try again.",
  google_config: "Google sign-in is not configured.",
  google_token: "Google sign-in failed. Please try again.",
  google_profile: "Could not load your Google profile.",
  google_signin_failed: "Sign-in with Google failed. Try again or use email.",
  google_error: "Something went wrong. Please try again.",
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useMeStore();

  useEffect(() => {
    const err = searchParams.get("error");
    if (err) {
      setError(GOOGLE_ERROR_MESSAGES[err] || decodeURIComponent(err));
      router.replace("/login", { scroll: false });
    }
  }, [searchParams, router]);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const deviceId = getOrCreateDeviceId();
      const user = await fetch("/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          deviceId,
          deviceName: getDeviceName(),
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
        method: "POST",
        credentials: "include",
      });
      const data = await user.json();
      if (data.status === 200) {
        setUser(data.user);
        localStorage.setItem("accessToken", data.token);
        router.push("/dashboard");
        window.location.href = "/dashboard";
      } else if (data.status === 403) {
        setError(data.message ?? "Maximum devices reached. Remove one in Settings > Devices.");
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError("Internal server error");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-[420px] border-0 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-slate-950/50 rounded-2xl">
        <CardHeader className="space-y-1.5 pb-6 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full border-slate-200 bg-white font-medium hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-800/80"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground dark:bg-slate-900/80">
                or continue with email
              </span>
            </div>
          </div>

          <form className="grid gap-4" onSubmit={formSubmitHandler}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className={`h-11 rounded-lg ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgotpassword"
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
            {error && (
              <p className="text-center text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="h-11 w-full rounded-lg font-medium"
              disabled={loading}
              variant={loading ? "ghost" : "default"}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Signing in…</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

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
