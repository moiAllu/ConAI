import { Router } from 'express';
import userRouter from './user.routes';
import chatAssistantRouter from './chat-assistant.routes';
import aiWritingRouter from './ai-writing.routes';
import contentDetectionRouter from './content-detection.routes';
import imageGenerationRouter from './image-genration.routes';
import rewriteRouter from './rewrite.routes';
import sumarizeRouter from './summarizer.routes';
import subscriptionPlanRouter from './subscription-plan.routes';

const router = Router();
router.use('/api', userRouter);
router.use('/api', chatAssistantRouter);
router.use("/api", aiWritingRouter);
router.use("/api",contentDetectionRouter);
router.use("/api", imageGenerationRouter);
router.use("/api", rewriteRouter)
router.use("/api", sumarizeRouter)
router.use("/api", subscriptionPlanRouter);

export default router;
