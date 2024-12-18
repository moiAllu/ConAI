import { NextApiRequest } from "next";
import { verifyToken } from "./token";

export const validateRoute = (req: any, res: Response, next: ()=> null) => {
    try {
        const token = req.headers.get("accessToken")
        if (!token) {
        return Response.json({
            message: 'Unauthorized',
            status: 401,
        });
        }
        const user= verifyToken(token)
        // const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user ;
        next()
    }catch(e){
        console.log(e);
        return Response.json({
            message: 'Unauthorized',
            status: 401,
        });
    }
}