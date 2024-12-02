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
import { use, useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";
import { useRouter } from "next/navigation";
import { useMeStore } from "@/app/dashboard/store";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useMeStore();
  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await fetch(
        process.env.NEXT_PUBLIC_CONAI_BACKEND_URL + "/api/login",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          method: "POST",
          credentials: "include",
        }
      );
      const data = await user.json();
      if (data.message === "Login successful") {
        console.log("Login successful");
        setUser(data.user);
        localStorage.setItem("accessToken", data.token);
        router.push("/dashboard");
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

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className={`${error && " border-red-700"}`}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgotpassword"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className={`${error && " border-red-700 "}`}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full flex items-center space-x-2"
              disabled={loading}
              variant={loading ? "ghost" : "default"}
            >
              <span>Login</span>
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
    </div>
  );
}
