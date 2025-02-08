import expres from 'express';

import { validateRoute } from '../helpers';
import {
  getUserAiWritingsHistory,
  aiWritingController,
  getAiWritingById,
  deleteAiWritingById,
} from '../controllers/ai-writing.controller';

const router = expres.Router();

router.get('/ai-writing/writings/:userId', validateRoute, getUserAiWritingsHistory);
router.get('/ai-writing/:id/:userId', validateRoute, getAiWritingById);
router.post('/ai-writing',validateRoute, aiWritingController);
router.delete('/ai-writing/:id/:userId', validateRoute, deleteAiWritingById)

export default router;
