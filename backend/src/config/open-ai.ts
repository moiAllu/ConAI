import OpenAI from 'openai';
import { CONFIG } from '.';

const openai = new OpenAI({ apiKey: CONFIG.OPENAI_API_KEY });

export default openai;
