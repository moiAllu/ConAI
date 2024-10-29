import { similarityCheck } from "../services/similarityCheck";
import { Request, Response } from "express";
import  replicate  from "../replicate";

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
export const replicateController = async (req: Request, res: Response) => {
    try{
        const input = {
            prompt: "1 girl",
            image_seed: 6091967260935476000
        };
       const output = await replicate.run("konieshadow/fooocus-api-realistic:612fd74b69e6c030e88f6548848593a1aaabe16a09cb79e6d714718c15f37f47", { input });
        console.log(output)

        return res.status(200).json({
            message: 'Replicated successfully',
            status: 200,
            data: output
        });
    }
    catch(e){
        return res.status(500).json({
            message: 'Internal server error',
            status: 500,
            error: e
        });
    }
}