import { Request, Response } from 'express';
import {OtpVerification, UserModel}  from "../mongodb/models" ;
import * as jwt from 'jsonwebtoken';
import {sendPasswordResetLink, sendVerificationCode, utils} from "../helpers/utils";
import * as cookie from 'cookie';
import * as bcrypt from 'bcrypt';
const postmark = require("postmark");
import { cat } from '@huggingface/transformers';

const cookieConfig = {
    httpOnly: true, // to disable accessing cookie via client side js
    secure: true, // to force https (if you use it)
    maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: true // if you use the secret with cookieParser
};
// Login controller
export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    try{
        // Check if user exists
        let user = await UserModel.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }
        // Check if password is correct
        // const checkPass= utils.compareHash(user.password, password);
        if(bcrypt.compareSync(password,user.password)){
            delete user.password;
            user.password = undefined;
            // Generate JWT token
            const token = await jwt.sign({user}, process.env.JWT_SECRET, {
                expiresIn: "8h"
            })

            res.setHeader(
                'Set-Cookie',
                cookie.serialize("CONAI", token, {
                  httpOnly: true,
                  maxAge: 8 * 60 * 60,
                  path: '/',
                  sameSite: 'lax',
                  secure: "true",
                  overwrite: true
                })
              )
            // Send token to client
            return res.status(200).json({
                message: "Login successful",
                user: user,
                token
            });
        }
        return res.status(400).json({
            message: "Password incorrect"
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Signup controller
export const signup = async(req: Request, res: Response) => {
    // TODO: Implement signup logic
    const { name, email, password } = req.body;
    try{
        // Check if user exists
        const user = await UserModel.findOne({
            email: email
        });
        if(user){
            return res.status(400).json({
                message: "User already exists",
                status: 400
            });
        }
        // Hash password
        const hashedPassword = await utils.genSalt(10,password);
        // Create new user
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        // Generate JWT token
        const token = jwt.sign({
            user: newUser
        }, process.env.JWT_SECRET, {
            expiresIn: "8h"
        });
        delete newUser.password;
        res.setHeader(
            'Set-Cookie',
            cookie.serialize("CONAI", token, {
              httpOnly: true,
              maxAge: 8 * 60 * 60,
              path: '/',
              sameSite: 'lax',
              secure: "true",
              overwrite: true
            })
          )
        // Send token to client
        return res.status(201).json({
            message: "Signup successful",
            status: 201,
            user: newUser
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
};

// Update user controller
export const update_user =async (req: Request, res: Response) => {
    // TODO: Implement update user logic
    const {name, email, password, newPassword, phone_number, profile} = req.body;
    try{
        // Check if user exists
        const user = await UserModel.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }
        const checkPass= utils.compareHash(user.password, password);
        // Hash password
        if(checkPass && user && newPassword){
            const hashedPassword = await utils.genSalt(10,newPassword);
        
        // Update user
        await UserModel.updateOne({
            email: email
        }, {
            name: name,
            password: hashedPassword,
            phone_number: phone_number,
            profile: profile
        });
        // Send response
        return res.status(200).json({
            message: "User updated successfully"
        });
    }
    return res.status(400).json({
        message: "Password incorrect"
    });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Delete user controller
export const delete_user = async(req: Request, res: Response) => {
    // TODO: Implement delete user logic
    const { email,password } = req.body;
    try{
        // Check if user exists
        const user = await UserModel.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }
        const checkPass= await utils.compareHash(user.password, password);
        if(!checkPass){
            return res.status(400).json({
                message: "Password incorrect"
            });
        }
        // Delete user
        await UserModel.deleteOne({
            email: email
        });
        // Send response
        res.clearCookie('token');
        return res.status(200).json({
            message: "User deleted successfully"
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const logout = async(req: Request, res: Response) => {
    res.clearCookie('CONAI');
    return res.status(200).json({
        status : 200,
        message: "Logout successful"
    });
}

export const forgotPassword = async(req: Request, res: Response) => {
    const { email } = req.body;
    try{ 
        // Check if user exists
        const user = await UserModel.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({
                status : 400,
                message: "The email you entered does not exist"
            });
        }
        // generate password reset token
        const token = jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        user.resetToken = token;
        await user.save();
        const PasswordResetLink = `${process.env.PASSWORD_RESET_LINK}?token=${token}`;
        console.log(PasswordResetLink);
        // const resetLinkGenerated= await sendPasswordResetLink(email,PasswordResetLink);
        if(PasswordResetLink !== "" && token !== ""){
            return res.status(200).json({
                status: 200,
                message: "A password reset link has been sent to your email"
            });
        }
        // if(resetLinkGenerated){
        //     return res.status(200).json({
        //         message: "Email sent"
        //     });
        // }
        return res.status(400).json({
            status : 400,
            message: "Email sending failed"
        });
    }catch(e){
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

export const resetPassword = async(req: Request, res: Response) => {
    const { password, verifyPassword } = req.body;
    const {token} = req.params;
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!verifyToken){
        return res.status(400).json({
            status: 400,
            message: "Invalid token"
        });
    }
    try{
        const email = verifyToken.email;
        // Check if user exists
        if(!email || !password || !verifyPassword){
            return res.status(400).json({
                status: 400,
                message: "All fields are required"
            });
        }
        if(password !== verifyPassword){
            return res.status(400).json({
                status: 400,
                message: "Passwords do not match"
            });
        }
        const user =
        await UserModel.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({
                status: 400,
                message: "User not found"
            });
        }
        if(!user.resetToken){
            return res.status(400).json({
                status: 400,
                message: "Invalid token"
            });
        }
        if(user.resetToken !== token){
            return res.status(400).json({
                status: 400,
                message: "Invalid token"
            });
        }
        // Hash password
        const hashedPassword = await utils.genSalt(10,password);
        // Update password
        user.password = hashedPassword.toString();
        user.resetToken = undefined;
        await user.save();
        // Send response
        return res.status(200).json({
            status: 200,
            message: "Password reset successful"
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

export const getUser = async(req: any, res: Response) => {
    const {user} = req.user;
    try{
        return res.status(200).json({
            status: 200,
            user
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}
export const sendSmtpPostMark = async(req: Request, res: Response) => {
    try{
        const   client = new postmark.ServerClient("c5959f65-7559-4878-801e-9a20db52fb22");
        const sent=  await  client.sendEmail({
            "From": "fofalo2247@anypng.com",
            "To": "fofalo2247@anypng.com",
            "Subject": "Hello from Postmark",
            "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
            "TextBody": "Hello from Postmark!",
            "MessageStream": "outbound"
        });
        return res.status(200).json({
            message: "Email sent"
            ,
            sent});
        }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
        
