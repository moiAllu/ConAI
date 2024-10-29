
import * as bcrypt from 'bcrypt'
import { Models } from 'interfaces/openAiModels';
import { createTransport } from 'nodemailer'
import openaiTokenCounter from 'openai-gpt-token-counter';
export const utils = {
    isJSON: (data: string) => {
      try {
        JSON.parse(data)
      } catch (e) {
        return false
      }
      return true
    },
    getTime: () => {
      const date = new Date()
      const time = date.getTime()
      return time
    },
    genSalt: (saltRounds, value) => {
      return new Promise((resolve, reject) => {
        const salt = bcrypt.genSaltSync(saltRounds)
        bcrypt.hash(value, salt, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      })
    },
    compareHash: (hash, value) => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(value, hash, (err, result): boolean | any => {
          if (err) reject(err)
          resolve(result)
        })
      })
    },
}

export const countTokens = (messages: any, model:  "gpt-3.5-turbo"|"gpt-3.5-turbo-16k"|"gpt-4"|"gpt-4-32k" ) => {
  const tokenCount= openaiTokenCounter.chat(messages,model)
  return tokenCount
}

export const transporter = createTransport({
    host :"smtp-api-pk2.infobip.com",
    port: 587,
    authMethod:"LOGIN",
    auth : {
      user:"al5690410",
      pass:"lawaN@123"
    }
})

// export const transporter = createTransport({
//   host :"smtp-relay.brevo.com",
//   port: 587,
//   auth : {
//       user: "78bd1d002@smtp-brevo.com",
//       pass: "xsmtpsib-4c65ca168f55cb7c06144cb8df398ee1b84885299e25cfa6b73c00330586ae31-85CMj4cHRSywB1vL"
//   }
// })

export const sendVerificationCode = async (email: string, otp: string) => {
  console.log(email,otp)
  try{
    return await transporter.sendMail({
      from: "noreply@conai.com",
      to: email,
      subject: "OTP Verification",
      html: `<p>Your OTP is <b>${otp}</b></p>`
    })
  }catch(e){
    console.log(e)
  }
  
}

export const sendPasswordResetLink = async (email: string, link: string) => {
  try{
    return await transporter.sendMail({
      from: "noreply@conai.com",
      to: email,
      subject: "Password Reset Link",
      html: `<p>Click <a href="${link}">here</a> to reset your password</p>`
    })
  }catch(e){
    console.log(e)
  }
}
