const postmark = require("postmark");
const key= process.env.POSTMARK_ENV_KEY ||""
const client = new postmark.ServerClient( key );
 
export const sendPasswordResetLink = async (email: string, link: string) => {
    try{
      const sent = await client.sendEmail({
        From: "fofalo2247@anypng.com",
        To: email,
        Subject: "Password Reset Request - ConAI",
        HtmlBody: `
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
        TextBody: `
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
        MessageStream: "outbound"
        
        
      });
      if(sent.ErrorCode===0){
        return {
          status: 200,
          message: sent
        }
      }
      return {
        status: 400,
        message: "Email not sent"
      }
    }catch(e){
      console.log(e)
    }
    
 
}
