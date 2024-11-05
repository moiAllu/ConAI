import { pipeline } from "@huggingface/transformers";
import { Request, Response } from 'express'


export const rewriter = async (req:Request,res:Response) => {
    const { text } = req.body
    try{
        // const pipe = await pipeline("text2text-generation", "Ateeqq/Text-Rewriter-Paraphraser",  { device: "webgpu" },)
        const HF_API_TOKEN = process.env.HF_API_TOKEN;
        const MODEL_ENDPOINT = 'humarin/chatgpt_paraphraser_on_T5_base';  
        const url = `https://api-inference.huggingface.co/models/${MODEL_ENDPOINT}`;
        const rewrite = await fetch(url, {
            method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HF_API_TOKEN}`,
                    'Content-Type': 'application/json',
                  },
                    body: JSON.stringify({ inputs: text }),
                });
        if(!rewrite){
            return res.status(500).json({
                message: "Internal server error",
                status: 500,
            });
        }

        // const pipe = await pipeline(
        //     "text2text-generation",
        //     "Ateeqq/Text-Rewriter-Paraphraser",
        //     { device: 'auto' },
        //   );
        // const response = await pipe(text)
        // console.log(response)
        // if(!response){
        //     return res.status(500).json({
        //         message: "Internal server error",
        //         status: 500,
        //     });
        // }
        const reader = rewrite.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse: string[] = [];
        let done = false;
    
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                const chunkText = decoder.decode(value, { stream: true });
                console.log(chunkText)
                try {
                    const chunk = JSON.parse(chunkText);
                    const content = chunk || 'Error generating AI response';
                    fullResponse.push(content);
                } catch (error) {
                    console.error('Error parsing chunk:', error);
                    fullResponse.push('Error generating AI response');
                }
            }
        }
        // for await(const chunks of rewrite.body){
        //     var string = new TextDecoder().decode(chunks);
        //     console.log(string)
        //     fullResponse.push(string);

        // }
        return res.json(fullResponse);

    }catch (e){
        console.log(e)
    }
}