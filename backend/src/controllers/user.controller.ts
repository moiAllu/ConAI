import * as bcrypt from "bcrypt";
import * as cookie from "cookie";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { sendPasswordResetLink, utils } from "../helpers/utils";
import { UserModel } from "../mongodb/models";
const postmark = require("postmark");

const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
  secure: true, // to force https (if you use it)
  maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
  signed: true, // if you use the secret with cookieParser
};
// Login controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    let user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    // Check if password is correct
    // const checkPass= utils.compareHash(user.password, password);
    if (bcrypt.compareSync(password, user.password)) {
      delete user.password;
      user.password = undefined;
      // Generate JWT token
      const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("CONAI", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          secure: "true",
          overwrite: true,
          sameSite:"lax",
          domain: process.env.DEPLOYMENT ==="production" ? "con-ai.vercel.app": 'localhost'
        })
      );
      // Send token to client
      return res.status(200).json({
        message: "Login successful",
        user: user,
        token,
      });
    }
    return res.status(400).json({
      message: "Password incorrect",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Signup controller
export const signup = async (req: Request, res: Response) => {
  // TODO: Implement signup logic
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    const user = await UserModel.findOne({
      email: email,
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        status: 400,
      });
    }
    // Hash password
    const hashedPassword = await utils.genSalt(10, password);
    // Create new user
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    // Generate JWT token
    const token = jwt.sign(
      {
        user: newUser,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );
    delete newUser.password;
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("CONAI", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        secure: "true",
        overwrite: true,
        sameSite:"lax",
        domain: process.env.DEPLOYMENT ==="production" ? "con-ai.vercel.app": 'localhost'
      })
    );
    // Send token to client
    return res.status(201).json({
      message: "Signup successful",
      status: 201,
      user: newUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

// Update user controller
export const update_user = async (req: Request, res: Response) => {
  // TODO: Implement update user logic
  const { name, email, bio } =
    req.body;
  try {
    // Check if user exists
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }
      user.name= name;
      user.bio=bio;

      await user.save();
      return res.status(200).json({
        status:200,
        message: "User updated successfully",
        user
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status:500,
      message: "Internal server error",
    });
  }
};

// Delete user controller
export const delete_user = async (req: Request, res: Response) => {
  // TODO: Implement delete user logic
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const checkPass = await utils.compareHash(user.password, password);
    if (!checkPass) {
      return res.status(400).json({
        message: "Password incorrect",
      });
    }
    // Delete user
    await UserModel.deleteOne({
      email: email,
    });
    // Send response
    res.clearCookie("token");
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("CONAI");
  return res.status(200).json({
    status: 200,
    message: "Logout successful",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "The email you entered does not exist",
      });
    }
    // generate password reset token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.resetToken = token;
    await user.save();
    const PasswordResetLink = `${process.env.PASSWORD_RESET_LINK}?token=${token}`;
    console.log(PasswordResetLink);
    const resetLinkGenerated= await sendPasswordResetLink(email,PasswordResetLink);
    if(resetLinkGenerated.status===200 && PasswordResetLink !== "" && token !== ""){
      return res.status(200).json({
        status: 200,
        message: "A password reset link has been sent to your email",
      });
    }
    return res.status(400).json({
      status: 400,
      message: "Email sending failed",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, verifyPassword } = req.body;
  const { token } = req.params;
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifyToken) {
    return res.status(400).json({
      status: 400,
      message: "Invalid token",
    });
  }
  try {
    const email = verifyToken.email;
    // Check if user exists
    if (!email || !password || !verifyPassword) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }
    if (password !== verifyPassword) {
      return res.status(400).json({
        status: 400,
        message: "Passwords do not match",
      });
    }
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }
    if (!user.resetToken) {
      return res.status(400).json({
        status: 400,
        message: "Invalid token",
      });
    }
    if (user.resetToken !== token) {
      return res.status(400).json({
        status: 400,
        message: "Invalid token",
      });
    }
    // Hash password
    const hashedPassword = await utils.genSalt(10, password);
    // Update password
    user.password = hashedPassword.toString();
    user.resetToken = undefined;
    await user.save();
    // Send response
    return res.status(200).json({
      status: 200,
      message: "Password reset successful",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const getUser = async (req: any, res: Response) => {
  const { user } = req.user;
  try {
    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const sendSmtpPostMark = async (req: Request, res: Response) => {
  try {
    const client = new postmark.ServerClient(
      "c5959f65-7559-4878-801e-9a20db52fb22"
    );
    const sent = await client.sendEmail({
      From: "support@ConAi.com",
      To: "vuboxa@polkaroad.net",
      Subject: "OTP Verification",
      HtmlBody: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification - YourApp</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f7fa;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333333;
                  font-size: 24px;
                  text-align: center;
                  margin-bottom: 20px;
              }
              p {
                  font-size: 16px;
                  color: #555555;
                  line-height: 1.5;
              }
              .otp {
                  font-size: 18px;
                  font-weight: bold;
                  color: #2c97f3;
                  text-align: center;
                  margin-top: 15px;
              }
              .footer {
                  font-size: 12px;
                  color: #888888;
                  text-align: center;
                  margin-top: 30px;
              }
          </style>
      </head>
      <body>
      
          <div class="container">
              <h1>ConAi - OTP Verification</h1>
              
              <p>Dear Valued User,</p>
              <p>Thank you for using YourApp. To complete your request, please use the following One-Time Password (OTP):</p>
              
              <div class="otp">
                
              </div>
              
              <p>Please note that this code is valid for a limited time and should be entered promptly. If you did not request this OTP, please disregard this email.</p>
              
              <div class="footer">
                  <p>For any assistance, feel free to contact our support team at <a href="mailto:support@yourapp.com">support@ConAi.com</a>.</p>
                  <p>This is an automated message. Please do not reply.</p>
              </div>
          </div>
      
      </body>
      </html>
      `,
      TextBody: `
      Hello,
      
      Thank you for using YourApp. To complete your request, please use the following One-Time Password (OTP):
      
      This code is valid for a limited time. Please use it as soon as possible.
      
      If you did not request this OTP, kindly ignore this email.
      
      For assistance, contact our support team at support@yourapp.com.
      
      This is an automated message. Please do not reply.
      
      Best regards,
      The YourApp Team
      `,
      MessageStream: "outbound"
      
    });
    return res.status(200).json({
      message: "Email sent",
      sent,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
