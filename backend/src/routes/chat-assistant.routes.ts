import { getGPTReponseController } from '../controllers/chat-assistant.controller';
import express from 'express';

const router = express.Router();

// AI assistant route
router.post('/chat/ai-assistant/open-ai', getGPTReponseController);

export default router;
