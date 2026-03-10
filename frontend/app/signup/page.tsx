"use client";
import { useWindowSize } from "@/lib/hooks";
import React from "react";
import CreateAccount from "./components/create-account";
import { InputOTPForm } from "./components/opt-verification";

const SignUp = () => {
  const [otpRequestGen, setOtpRequestGen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const isPhone = useWindowSize().width < 768;

  const pageBg =
    "min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950";

  if (isPhone) {
    return (
      <div className={`w-full ${pageBg} flex justify-center p-4`}>
        {otpRequestGen ? (
          <div className="flex flex-col gap-4 w-full max-w-[340px] justify-center">
            <div className="rounded-2xl border-0 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-slate-950/50">
              <h2 className="text-xl font-semibold tracking-tight">
                Verify your email
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter the code sent to your email to verify your account
              </p>
              <div className="mt-4">
                <InputOTPForm email={email} />
              </div>
            </div>
          </div>
        ) : (
          <CreateAccount
            setOtpRequestGen={setOtpRequestGen}
            firstName={firstName}
            password={password}
            lastName={lastName}
            email={email}
            setEmail={setEmail}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-full ${pageBg} flex items-center justify-center gap-8 p-6`}
    >
      <CreateAccount
        setConfirmPassword={setConfirmPassword}
        setOtpRequestGen={setOtpRequestGen}
        firstName={firstName}
        password={password}
        lastName={lastName}
        email={email}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
      />
      {otpRequestGen && (
        <div className="flex w-full max-w-[380px] flex-col gap-4">
          <div className="rounded-2xl border-0 bg-white/80 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-slate-950/50">
            <h2 className="text-xl font-semibold tracking-tight">
              Verify your email
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the code sent to your email to verify your account
            </p>
            <div className="mt-6">
              <InputOTPForm email={email} otpRequestGen={otpRequestGen} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
