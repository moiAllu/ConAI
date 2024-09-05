import { Router } from 'express';
import userRouter from './user.routes';
import chatAssistantRouter from './chat-assistant.routes';
import aiWritingRouter from './ai-writing.routes';

const router = Router();

router.use('/api', userRouter);
router.use('/api', chatAssistantRouter);
router.use("/api", aiWritingRouter);

export default router;
