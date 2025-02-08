import { createTransport } from "nodemailer";

export const transporter = createTransport({
    port: 465,               // true for 465, false for other ports
    secure: true,
    host: "smtp.gmail.com",
       auth: {
            user: process.env.GOOGLE_SMTP_USER || "mariikh72@gmail.com",
            pass: process.env.GOOGLE_SMTP_PASS|| "ucotssafiswipoyj",
         },
    });
    
export const sendPasswordResetLink = async (email: string, link: string) => {
        try{
          const {response} = await transporter.sendMail({
            from: "mariikh72@gmail.com",
            to: email,
            subject: "Password Reset Request - ConAI",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset Request - ConAI.io</title>
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
                    .reset-link {
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
                    .btn {
                        display: inline-block;
                        padding: 12px 20px;
                        background-color: #2c97f3;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 16px;
                        text-align: center;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
            
                <div class="container">
                    <h1>ConAI.io - Password Reset Request</h1>
                    
                    <p>Dear Valued User,</p>
                    <p>We received a request to reset your password for your ConAI.io account. If you did not request a password reset, please disregard this email.</p>
                    
                    <p>To reset your password, please click the button below:</p>
                    
                    <div class="reset-link">
                        <a href="${link}" class="btn">Reset Your Password</a>
                    </div>
                    
                    <p>This link will expire in 30 minutes for your security. If you did not request a password reset, please ignore this email.</p>
                    
                    <div class="footer">
                        <p>For any assistance, feel free to contact our support team at <a href="mailto:support@conai.io">support@conai.io</a>.</p>
                        <p>This is an automated message. Please do not reply.</p>
                    </div>
                </div>
            
            </body>
            </html>
            `,
            text: `
            Hello,
            
            We received a request to reset your password for your ConAI.io account. If you did not make this request, please disregard this email.
            
            To reset your password, click the following link (it will expire in 30 minutes):
            
            ${link}
            
            If you did not request a password reset, please ignore this message.
            
            For assistance, contact our support team at support@conai.io.
            
            This is an automated message. Please do not reply.
            
            Best regards,
            The ConAI.io Team
            `,
          });
          if (response.startsWith("250")) {
            return {
                status: 200,
                message:"successfully sent the password reset mail"
              
            }
          } else {
            return {
                status: 400,
                message:"invalid request"
              
            }
          }
        }catch(e){
          console.log(e)
        }
}
    
export const sendVerificationCode = async (email: string, otp: string) => {
    try{
       const {response} = await transporter.sendMail({
        from: "mariikh72@gmail.com",
        to: email,
        subject: "Conai-OTP Verification",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ConAi - OTP Verification</title>
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
                <h1>ConAI - OTP Verification</h1>
                
                <p>Dear Valued User,</p>
                <p>Thank you for using ConAI. To complete your request, please use the following One-Time Password (OTP):</p>
                
                <div class="otp">
                    ${otp}
                </div>
                
                <p>Please note that this code is valid for a limited time and should be entered promptly. If you did not request this OTP, please disregard this email.</p>
                
                <div class="footer">
                    <p>For any assistance, feel free to contact our support team at <a href="mailto:support@conai.com">support@conai.com</a>.</p>
                    <p>This is an automated message. Please do not reply.</p>
                </div>
            </div>
        
        </body>
        </html>
        `,
        text: `
        Hello,
        
        Thank you for using YourApp. To complete your request, please use the following One-Time Password (OTP):
        
        ${otp}
        
        This code is valid for a limited time. Please use it as soon as possible.
        
        If you did not request this OTP, kindly ignore this email.
        
        For assistance, contact our support team at support@yourapp.com.
        
        This is an automated message. Please do not reply.
        
        Best regards,
        The YourApp Team
        `,
      });
      if (response.startsWith("250")) {
        return {
            status: 200,
            message:"successfully sent the verfication mail"
          
        }
      } else {
        return {
            status: 400,
            message:"invalid request"
          
        }
      }
    }catch(e){
      console.log(e)
    }
  }