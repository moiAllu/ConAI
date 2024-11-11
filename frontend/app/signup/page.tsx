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
  const isPhone = useWindowSize().width < 768;

  if (isPhone) {
    return (
      <div className="w-full h-screen flex justify-center">
        {otpRequestGen ? (
          <div className=" flex flex-col gap-4 w-full h-full max-w-[300px] justify-center">
            <div>
              <h2 className="text-2xl font-bold">Verify your email</h2>
              <p className="text-sm text-gray-500">
                Enter the OTP sent to your email to verify your account
              </p>
            </div>
            <InputOTPForm email={email} />
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
          />
        )}
      </div>
    );
  } else
    return (
      <div className="w-full h-screen md:flex justify-center items-center gap-8">
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
        />
        {otpRequestGen && (
          <div className=" flex flex-col gap-4 w-full h-full max-w-[300px] justify-center">
            <div>
              <h2 className="text-2xl font-bold">Verify your email</h2>
              <p className="text-sm text-gray-500">
                Enter the OTP sent to your email to verify your account
              </p>
            </div>
            <InputOTPForm email={email} />
          </div>
        )}
      </div>
    );
};

export default SignUp;
