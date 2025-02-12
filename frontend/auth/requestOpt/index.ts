import { UserModel } from "@/lib/mongodb/model/userModel";
import { OtpVerification } from "@/lib/mongodb/model/otpVerification";
import { sendVerificationCode } from "@/lib/helper/generatePasswordResetLink";

export const requestOtp = async (email: string) => {
  try {
    // Check if email is provided
    if (!email) {
      return {
        status: 400,
        message: "Please enter email",
      };
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        status: 400,
        message: "User not found",
      };
    }

    // Check if user is already verified
    if (user.verified) {
      return {
        status: 300,
        message: "User already verified",
      };
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Update or create OTP verification record
    const alreadyOtpGen = await OtpVerification.findOneAndUpdate(
      { email },
      { otp },
      { new: true, upsert: true }
    );

    if (!alreadyOtpGen) {
      return {
        status: 400,
        message: "OTP generation failed",
      };
    }

    // Send verification code
    const verificationCodeToMail = await sendVerificationCode(email, otp);
    if (verificationCodeToMail?.status !== 200) {
      return {
        status: 400,
        message: "Failed to send OTP",
      };
    }

    return {
      status: 200,
      message: "OTP sent successfully",
    };
  } catch (e) {
    console.error("Error in requestOtp:", e);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};
