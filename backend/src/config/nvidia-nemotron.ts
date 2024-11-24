import OpenAI from "openai";
import { CONFIG } from ".";

const nvidiaNemotronClient = new OpenAI({ 
    apiKey: CONFIG.NVIDIA_NEMOTRON_API_KEY,
    baseURL: CONFIG.NVIDIA_NEMOTRON_BASE_URL
});

export default nvidiaNemotronClient;