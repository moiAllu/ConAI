import { imageGenerationController, getGeneratedImageHistory , deleteGeneratedImageById, getGeneratedImageById } from '../controllers';
import { validateRoute } from '../helpers/auth';
import express from 'express';


const router = express.Router();

router.get('/image-generation',validateRoute, getGeneratedImageHistory);
router.get('/image-generation/:id',validateRoute, getGeneratedImageById);
router.post('/generate-image', validateRoute, imageGenerationController);
router.delete('/image-generation/:id',validateRoute, deleteGeneratedImageById);

export default router;
