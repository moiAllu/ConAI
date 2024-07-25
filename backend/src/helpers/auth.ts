import * as express from 'express';
import * as jwt from 'jsonwebtoken';
interface Request extends express.Request {
    user: any;
}
interface Response extends express.Response {}
interface NextFunction extends express.NextFunction {}

export const validateRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
            status: 401,
        });
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }catch(e){
        console.log(e);
        return res.status(401).json({
            message: 'Unauthorized',
            status: 401,
        });
    }
}