import { ImageGeneration } from "../mongodb/models";

export const storeGeneratedImageInHistory = async (userId, prompt, image_url) => {
    try{
        if(!userId || !prompt || !image_url){
            return {
                message: 'Please provide all the required fields',
                status: 400
            }
        }
        const imageGeneration = new ImageGeneration({
            userId,
            prompt,
            image: image_url,
        });
        if(!imageGeneration){
            return {
                message: 'Failed to store image in history',
                status: 500
            }
        }
        const newImageGeneration = await imageGeneration.save();
        return newImageGeneration;
    }catch(e){
        return e;
    }
}