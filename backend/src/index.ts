
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './mongodb/connect';
import cors from 'cors';
import userRouter from './routes/user.routes';
import cookieParser from 'cookie-parser';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));
app.use(cookieParser("secret"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});
app.use('/api',userRouter);
try{
    connectDB({url:process.env.MONGODB_URL});
    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
}catch(e){
    console.log(e);
}