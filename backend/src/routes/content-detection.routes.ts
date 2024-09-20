import { getContentDetectionResponse } from '../controllers/content-detection.controller';
import express from 'express';

const router = express.Router();

router.post('/content-detection', getContentDetectionResponse);

export default router;
