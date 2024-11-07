import express from 'express';
import { validateRoute } from '../helpers';

import {createSummarizer,getSummarizerByUserIdController, getSummarizerHistoryContorller,deleteSummarizerByIdController } from '../controllers';

const router = express.Router();

router.post('/summarize/create',validateRoute,createSummarizer );
router.get('/summarize/summarizes/:userId',validateRoute, getSummarizerHistoryContorller);
router.get('/summarize/:userId/:summarizeId',validateRoute, getSummarizerByUserIdController);
router.delete('/summarize/:userId/:summarizeId',validateRoute, deleteSummarizerByIdController);

export default router;
