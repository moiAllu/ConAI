import { hashPassword } from "@/lib/helper/encryption";
import { verifyToken } from "@/lib/helper/token";
import { UserModel } from "@/lib/mongodb/model/userModel";
interface ResetProps {
password:string 
verifyPassword:string
token:string
}
export const resetPassword = async ({password,verifyPassword,token}:ResetProps) => {
    const verifedToken = verifyToken(token) as any;
    if (!verifedToken) {
      return {
        status: 400,
        message: "Invalid token",
      };
    }
    try {
      const {email} = verifedToken.user;
      // Check if user exists
      if (!email || !password || !verifyPassword) {
        return {
          status: 400,
          message: "All fields are required",
        };
      }
      if (password !== verifyPassword) {
        return {
          status: 400,
          message: "Passwords do not match",
        };
      }
      const user = await UserModel.findOne({
        email: email,
      });
      if (!user) {
        return {
          status: 400,
          message: "User not found",
        };
      }
      if (!user.resetToken) {
        return {
          status: 400,
          message: "Invalid token",
        };
      }
      if (user.resetToken !== token) {
        return {
          status: 400,
          message: "Invalid token",
        };
      }
      // Hash password
      const hashedPassword = await hashPassword(10, password);
      // Update password
      user.password = hashedPassword.toString();
      user.resetToken = undefined;
      await user.save();
      // Send response
      return {
        status: 200,
        message: "Password reset successful",
      };
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  };