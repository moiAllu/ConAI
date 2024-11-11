import { validateRoute } from '../helpers/auth';
import { getContentDetectionHistory, getContentDetectionHistoryById, getContentDetectionResponse } from '../controllers/content-detection.controller';
import express from 'express';

const router = express.Router();

router.get('/content-detection/detections/:userId',validateRoute, getContentDetectionHistory);
router.get('/content-detection/detection/:userId/:id', validateRoute, getContentDetectionHistoryById);
router.post('/content-detection/detection', validateRoute, getContentDetectionResponse);

export default router;
