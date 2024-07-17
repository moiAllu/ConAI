import { sendVerificationCode } from "../helpers/utils";
import { OtpVerification, UserModel } from "../mongodb/models";
import { Request, Response } from "express";

export const otpVerification = async (req:Request, res:Response) => {
    const {email, otp} = req.body;
    try{
        if(!email || !otp){
            return res.status(400).json({
                message: "Invalid request",
                status: 400
            });
        }

        const response =  await OtpVerification.findOne({email});
        if(!response){
            return res.status(400).json({
                message: "Invalid user",
                status: 400
            });
        }
        if(response.otp===otp){
            await OtpVerification.findOneAndDelete({email,otp});
            await UserModel.findOneAndUpdate({email},{verified:true});

            return res.status(200).json({
                message: "OTP verified successfully",
                status: 200
            });
        }
        return res.status(400).json({
            message: "OTP verification failed, Invalid OTP",
            status: 400
        }) 
        }catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Internal server error",
                status: 500
            });
        }
}
export const requestForOtpVerificationCode = async (req:Request, res:Response) => {
    const {email} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(email,otp)
    try{

       const alreadyOtpGen= await OtpVerification.findOneAndUpdate({email},{
            otp
        });

        if(!alreadyOtpGen){
         const otpAgainstEmail = new OtpVerification({email, otp})
         await otpAgainstEmail.save();

         if (!otpAgainstEmail) {
            return res.status(400).json({
                message: "OTP generation failed"
            });
        }
        }
        const verificationCodeToMail =await sendVerificationCode(email, otp);

        if(verificationCodeToMail){
            return res.status(200).json({
                message: "OTP sent successfully"
            });
        }
        return res.status(400).json({
            message: "OTP sent failed"
        })  
        }catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
}
