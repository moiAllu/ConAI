import { Router } from 'express';
import userRouter from './user.routes';
import chatAssistantRouter from './chat-assistant.routes';
import aiWritingRouter from './ai-writing.routes';
import contentDetectionRouter from './content-detection.routes';
import imageGenerationRouter from './image-genration.routes';

const router = Router();

router.use('/api', userRouter);
router.use('/api', chatAssistantRouter);
router.use("/api", aiWritingRouter);
router.use("/api",contentDetectionRouter);
router.use("/api", imageGenerationRouter);

export default router;
