import { Router } from 'express';
import userRouter from './user.routes';
import chatAssistantRouter from './chat-assistant.routes';

const router = Router();

router.use('/api', userRouter);
router.use('/api', chatAssistantRouter);

export default router;
