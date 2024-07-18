
import * as bcrypt from 'bcrypt'
import { createTransport } from 'nodemailer'
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
// export const transporter = createTransport({
//     host :"sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth : {
//         user: "da790aed33f7b7",
//         pass: "37911721ba8a1d"
//     }
// })

export const transporter = createTransport({
  host :"smtp-relay.brevo.com",
  port: 587,
  auth : {
      user: "78bd1d002@smtp-brevo.com",
      pass: "xsmtpsib-4c65ca168f55cb7c06144cb8df398ee1b84885299e25cfa6b73c00330586ae31-85CMj4cHRSywB1vL"
  }
})

export const sendVerificationCode = async (email: string, otp: string) => {
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
