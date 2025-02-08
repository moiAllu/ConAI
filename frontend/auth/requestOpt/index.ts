import { UserModel } from "@/lib/mongodb/model/userModel";
import { OtpVerification } from "@/lib/mongodb/model/otpVerification"
import { sendVerificationCode } from "@/lib/helper/generatePasswordResetLink";

export const requestOtp = async (email:string) => {
    try {
      // Check if user exists
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      if(!email ){
        return {
          status:400,     
          message: "Please enter email",
      }
      }
      let user = await UserModel.findOne({
        email: email,
      });
      if (!user) {
        return {
            status:400,     
            message: "User not found",
        }
      }
        if(user.verified){
            return {
                status: 300,
                message: "User already verified"
            };
        }
       const alreadyOtpGen= await OtpVerification.findOneAndUpdate({email},{
            otp
        });
        if(!alreadyOtpGen){
         const otpAgainstEmail = new OtpVerification({email, otp})
         await otpAgainstEmail.save();
         if (!otpAgainstEmail) {
            return {
                status:400,
                message: "OTP generation failed"
            };
        }
        }
        const verificationCodeToMail = await sendVerificationCode(email, otp) as any;
        return verificationCodeToMail;
      } catch (e) {
      console.log(e);
      return {
        status: 500,
        message: e,
        }
      
    }
}