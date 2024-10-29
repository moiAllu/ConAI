import { validateRoute } from '../helpers/auth';
import { getContentDetectionHistory, getContentDetectionHistoryById, getContentDetectionResponse } from '../controllers/content-detection.controller';
import express from 'express';
import { replicateController, similarityCheckController } from '../controllers/similarity-check.controller';

const router = express.Router();

router.get('/content-detection/detections/:userId',validateRoute, getContentDetectionHistory);
router.get('/content-detection/detection/:userId/:id', validateRoute, getContentDetectionHistoryById);
router.post('/content-detection/detection', validateRoute, getContentDetectionResponse);
router.get("/similarity-check",similarityCheckController)
router.get("/replicate", replicateController)

export default router;
