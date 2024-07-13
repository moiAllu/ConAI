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

export default function ForgotPasswordForm() {
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
                required
              />
              <Link
                href="/login"
                className="ml-auto inline-block text-sm underline"
              >
                login
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Submit
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
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Email Sent</CardTitle>
          <CardDescription>
            A verification link has been sent to your email. Please check your
            email to reset your password.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
