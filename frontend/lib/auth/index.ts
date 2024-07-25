import {jwtVerify} from "jose"

export const verifyJwt = async(token: string) => {
    if(token){
        return await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    }
    }
