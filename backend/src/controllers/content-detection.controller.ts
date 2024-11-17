import { AiDetection, PlagrismDetection } from '../mongodb/models';
import {generateCopyscapeResponse } from '../copyscape';
import {getGoogleResponse} from '../google';
import { Request, Response } from 'express';
import { getContentDetectionOpenAiRes } from '../open-ai';
import { getAiDetctionHistory, getAiDetectionById, getPlagDetectionById, getPlagrismDetectionHistory } from '../services/contentDetection';
interface IPlagrismDetection{
    prompt: string;
    querywords: number;
    count: number;
    cost: number;
    result: {
        url: string;
        index: number;
        title   : string;
        textsnippet: string;
        htmlsnippet: string;
        minwordsmatched: number;
        viewurl: string;
    }[];
}
export const getContentDetectionResponse = async (req:Request,res:Response) => {
    const {userId, method, content, compareTo} = req.body;
 
    try{
        if(method === "Plagiarism Detection"){
            const responseFromCopyscape =  await generateCopyscapeResponse(content) as IPlagrismDetection;
            // const responseFromGoogle = await getGoogleResponse(text);
            // console.log('getContentDetectionResponse ', responseFromGoogle);
            if(!responseFromCopyscape){
                return res.status(404).json({
                    message: 'Content not found',
                    status: 404
                }
            )
        }
        const user = await PlagrismDetection.findOne({userId});
        if(user){
            user.data.push({
                prompt:content,
                querywords: responseFromCopyscape.querywords,
                count: responseFromCopyscape.count,
                cost: responseFromCopyscape.cost,
                result: responseFromCopyscape.result
            })
            await user.save();
            return res.status(200).json({
                message: 'Content fetched successfully',
                status: 200,
                data: user.data[user.data.length-1]
            });
        }
        const response = new PlagrismDetection({method, userId, data:{ prompt:content, querywords: responseFromCopyscape.querywords, count: responseFromCopyscape.count, cost: responseFromCopyscape.cost, result: responseFromCopyscape.result}});
        await response.save();
        return res.status(200).json({
            message: 'Content fetched successfully',
            status: 200,
            data: response.data[response.data.length-1]
        });
    }else if(method === "Ai Detection"){
        const tunePrompt = `Your task is to detect whether the following text contains AI-generated content.Analyze the text and return a response with the following format, do not add any "\n" or "\t" in the response:"{"aiDetected": true/false,"confidence": 0 - 1,"aiPercentage": 0 - 100,"aiContent": string[]}".The analysis should be based on the provided text: '${content}'`;

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
                    prompt:content,
                    response:responseAsObject
                }
            );
            await response.save();
            return res.status(200).json({
                message: 'Content fetched successfully',
                status: 200,
                data: response.data[response.data.length-1]
            });
        }
        const newResponse = new AiDetection({method, userId, data:{
            prompt:content,
            created_at: new Date(),
            response:responseAsObject
        }});
        await newResponse.save();

        return res.status(200).json({
            message: 'Content fetched successfully',
            status: 200,
            data: newResponse.data[newResponse.data.length-1]
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

export const getContentDetectionHistory = async (req:Request,res:Response) => {
    const {userId} = req.params;
    try{
        const aiDetection = await getAiDetctionHistory(userId);
        const plagrismDetection = await getPlagrismDetectionHistory(userId);
        if(!aiDetection && !plagrismDetection){
            return res.status(404).json({
                message: 'Content not found',
                status: 404
            });
        }
        return res.status(200).json({
            message: 'Content fetched successfully',
            status: 200,
            data: {aiDetection, plagrismDetection}
        });
    }catch(e){
        return  res.status(500).json({
            message: 'Internal server error',
            status: 500
            });
    }
}
export const getContentDetectionHistoryById = async (req:Request,res:Response) => {
    const {userId, id} = req.params;
    
    try{
        const aiDetection = await getAiDetectionById(userId,id);
        const plagrismDetection = await getPlagDetectionById(userId,id);

        if(!aiDetection && !plagrismDetection){
            return res.status(404).json({
                message: 'Content not found',
                status: 404
            });
        }
       if(aiDetection){
        return res.status(200).json({
            message: 'Content fetched successfully',
            status: 200,
            data: {method:"Ai detection", aiDetection}
        });
       }
         return res.status(200).json({
          message: 'Content fetched successfully',
          status: 200,
          data: {method:"plagrism detection",plagrismDetection}
        });
    }catch(e){
        return  res.status(500).json({
            message: 'Internal server error',
            status: 500
            });
    }
}

