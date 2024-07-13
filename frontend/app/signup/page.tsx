import React from "react";
import CreateAccount from "./components/create-account";
import { InputOTPForm } from "./components/opt-verification";

const SignUp = () => {
  return (
    <div className="w-full h-screen md:flex justify-center items-center space-x-8">
      <CreateAccount />
      <div className=" flex flex-col gap-4 w-full h-full max-w-[300px] justify-center">
        <div>
          <h2 className="text-2xl font-bold">Verify your email</h2>
          <p className="text-sm text-gray-500">
            Enter the OTP sent to your email to verify your account
          </p>
        </div>
        <InputOTPForm />
      </div>
    </div>
  );
};

export default SignUp;
