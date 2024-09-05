import expres from 'express';

import { validateRoute } from '../helpers';
import {
  getUserAiWritingsHistory,
  aiWritingController,
  getAiWritingById,
} from '../controllers/ai-writing.controller';

const router = expres.Router();

router.get('/ai-writing/writings/:userId', validateRoute, getUserAiWritingsHistory);
router.get('/ai-writing/:id/:userId', validateRoute, getAiWritingById);
router.post('/ai-writing',validateRoute, aiWritingController);

export default router;
