import React from "react";
import { InputOTPForm } from "../components/opt-verification";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

const VerifyOtp = async () => {
  const user = cookies().get("CONAI");
  const decode = (await verifyJwt(user?.value || "")) as any;
  return (
    <div className="w-full h-screen flex justify-center">
      <div className=" flex flex-col gap-4 w-full h-full max-w-[300px] justify-center">
        <div>
          <h2 className="text-2xl font-bold">Verify your email</h2>
          <p className="text-sm text-gray-500">
            Enter the OTP sent to your email to verify your account
          </p>
        </div>
        {decode && (
          <InputOTPForm
            email={decode.payload.user.email}
            otpRequestGen={true}
          />
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
