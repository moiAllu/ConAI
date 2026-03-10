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
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";
import { useWindowSize } from "@/lib/hooks";
import { Toaster, toast } from "sonner";
import { forgotPassowrd } from "@/lib/apicalls/user";

const cardClass =
  "w-full max-w-[420px] border-0 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-slate-950/50 rounded-2xl";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isPhone = useWindowSize().width < 640;

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await forgotPassowrd(email);
      if (data.status === 200) {
        toast.success(data.message);
        setSuccess(true);
      } else {
        toast.error(data.message);
        setError(data.message);
      }
      setLoading(false);
    } catch (e) {
      toast.error("Internal server error");
      console.log(e);
      setError("Internal server error");
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  if (success) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <Toaster richColors />
        <Card className={cardClass}>
          <CardHeader className="space-y-1.5 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Check your email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              A verification link has been sent to your email. Use it to reset
              your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="h-11 w-full rounded-lg font-medium">
              <Link href="/login">Back to sign in</Link>
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

  const formContent = (
    <>
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
              <span className="ml-2">Sending link…</span>
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
      <div className="space-y-2 text-center">
        <Link
          href="/login"
          className="block text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          Back to sign in
        </Link>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );

  if (isPhone) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <Toaster richColors />
        <Card className={cardClass}>
          <CardHeader className="space-y-1.5 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Forgot password
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your email and we&apos;ll send you a link to reset your
              password.
            </CardDescription>
          </CardHeader>
          <CardContent>{formContent}</CardContent>
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
            Forgot password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>{formContent}</CardContent>
      </Card>
    </div>
  );
}
