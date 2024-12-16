import * as jwt from "jsonwebtoken";
interface TokenizationProps{
    user:{}
}
export const tokenization=async ({user}:TokenizationProps)=>{
    const secret = process.env.JWT_SECRET as string || ""
    const token = await jwt.sign({ user }, secret , {
        expiresIn: "8h",
    });
    return token;
}
export const verifyToken =(token:string)=>{
     const secret = process.env.JWT_SECRET as string || ""
     const verifedToken = jwt.verify(token, secret); 
     return verifedToken
}