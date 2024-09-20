import { AiDetection, PlagrismDetection } from '../mongodb/models';
import {generateCopyscapeResponse } from '../copyscape';
import {getGoogleResponse} from '../google';
import { Request, Response } from 'express';
import { getContentDetectionOpenAiRes } from '../open-ai';
export const getContentDetectionResponse = async (req:Request,res:Response) => {
    const {text, userId, method} = req.body;
    try{
        if(method === "Plagirism Detection"){

            const responseFromCopyscape = await generateCopyscapeResponse(text);
            // const responseFromGoogle = await getGoogleResponse(text);
            // console.log('getContentDetectionResponse ', responseFromGoogle);
            if(!responseFromCopyscape){
                return res.status(404).json({
                    message: 'Content not found',
                    status: 404
                }
            )
        }
        const response = new PlagrismDetection({method, userId, data:responseFromCopyscape});
        await response.save();
        
        return res.status(200).json({
            message: 'Content fetched successfully',
            status: 200,
            data: responseFromCopyscape
        });
    }else if(method === "Ai Detection"){
        const tunePrompt = `Your task is to detect whether the following text contains AI-generated content.Analyze the text and return a response with the following format, do not add any "\n" or "\t" in the response:"{"aiDetected": true/false,"confidence": 0 - 1,"aiPercentage": 0 - 100,"aiContent": string[]}".The analysis should be based on the provided text: '${text}'`;

        const responseFromOpenAi= await getContentDetectionOpenAiRes(tunePrompt);
        if(!responseFromOpenAi){
            return res.status(404).json({
                message: 'Content not found',
                status: 404
            }
        )
     }   
        const responseAsObject= JSON.parse(`${responseFromOpenAi}`);
        const response = await AiDetection.findOne({userId});
        if(response){
            response.data.push(
                {
                    prompt:text,
                    response:responseAsObject
                }
            );
            await response.save();
            return res.status(200).json({
                message: 'Content fetched successfully',
                status: 200,
                data: responseFromOpenAi
            });
        }
        const newResponse = new AiDetection({method, userId, data:{
            prompt:text,
            created_at: new Date(),
            response:responseAsObject
        }});
        await newResponse.save();

        return res.status(200).json({
            message: 'Content fetched successfully',
            status: 200,
            data: responseFromOpenAi
        });
        
    }
    else if(method === "Compare"){
    }
    return res.status(400).json({
        message: 'Invalid request',
        status: 400
    }); 

    }catch(e){
        return  res.status(500).json({
            message: 'Internal server error',
            status: 500
            });
    }
}