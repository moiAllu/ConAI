import {
  getChatHistoryController,
  getUserChatsController,
  getGPTReponseController,
} from '../controllers/chat-assistant.controller';
import express from 'express';

const router = express.Router();

router.get('/chat/ai-assistant/chats/:userId', getUserChatsController);
router.get('/chat/ai-assistant/:chatId', getChatHistoryController);

router.post('/chat/ai-assistant/open-ai', getGPTReponseController);

export default router;
