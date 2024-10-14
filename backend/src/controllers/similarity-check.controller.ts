import { similarityCheck } from "../services/similarityCheck";
import { Request, Response } from "express";

export const similarityCheckController = async (req: Request, res: Response) => {
    try{
        const similarityChecked= await similarityCheck();
        return res.status(200).json({
            message: 'Similarity checked successfully',
            status: 200,
            data: similarityChecked
        });
    }
    catch(e){
        return res.status(500).json({
            message: 'Internal server error',
            status: 500
        });
    }
}