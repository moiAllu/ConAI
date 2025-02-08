import { tokenization } from "@/lib/helper/token";
import { UserModel } from "@/lib/mongodb/model/userModel";
import { sendPasswordResetLink } from "@/lib/helper/generatePasswordResetLink";

export const forgotPassword = async (email:string) => {
    try {
      // Check if user exists
      const user = await UserModel.findOne({
        email: email,
      });
      if (!user) {
        return {
          status: 400,
          message: "The email you entered does not exist",
        };
      }
      // generate password reset token
      const token = await tokenization({user})
      user.resetToken = token;
      await user.save();
      const PasswordResetLink = `${process.env.NEXT_PUBLIC_CONAI_PASSWORD_RESET_LINK}?token=${token}`;
      const resetLinkGenerated= await sendPasswordResetLink(email,PasswordResetLink) as any;
      if(resetLinkGenerated.status===200 && PasswordResetLink !== "" && token !== ""){
        return {
          status: 200,
          message: "A password reset link has been sent to your email",
        };
      }
      return {
        status: 400,
        message: "Email sending failed",
      };
    } catch (e) {
      return {
        status: 500,
        message: "Internal server error",
        error: e
      };
    }
  };
  