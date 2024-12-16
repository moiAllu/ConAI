import { cookies } from "next/headers";
interface SerializeCookieProps {
    name: string
    token: any
    properties:{
        httpOnly: boolean,
        maxAge: number,
        path: string,
        sameSite: boolean,
        secure: boolean,
        overwrite: boolean,
    }
}
export const serializeCookie = async ({name, token, properties}:SerializeCookieProps) =>{
    return cookies().set(name, token, properties);
}