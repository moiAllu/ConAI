import React from "react";
import { InputOTPForm } from "../components/opt-verification";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VerifyOtp = async () => {
  const user = cookies().get("CONAI");
  const decode = (await verifyJwt(user?.value || "")) as any;
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Card className="w-full max-w-[420px] rounded-2xl border-0 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-slate-950/50">
        <CardHeader className="space-y-1.5 pb-6 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Verify your email
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the 6-digit code sent to your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {decode && (
            <InputOTPForm
              email={decode.payload.user.email}
              otpRequestGen={true}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
