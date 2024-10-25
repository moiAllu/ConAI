import { validateRoute } from '../helpers';
import {
  getChatHistoryController,
  getUserChatsController,
  getGPTReponseController,
} from '../controllers/chat-assistant.controller';
import express from 'express';


const router = express.Router();

router.get('/chat/ai-assistant/chats/:userId',validateRoute, getUserChatsController);
router.get('/chat/ai-assistant/:chatId',validateRoute, getChatHistoryController);
router.post('/chat/ai-assistant/open-ai',validateRoute, getGPTReponseController);

export default router;
