import { imageGenerationController, getGeneratedImageHistory , deleteGeneratedImageById, getGeneratedImageById, downloadGeneratedImageById } from '../controllers/image-generation.controller';
import { validateRoute } from '../helpers/auth';
import express from 'express';


const router = express.Router();

router.get('/image-generation/images/:userId',validateRoute, getGeneratedImageHistory);
router.get('/image/:imageId/:userId',validateRoute, getGeneratedImageById);
router.post('/generate-image',validateRoute,  imageGenerationController);
router.delete('/image/:id',validateRoute, deleteGeneratedImageById);
router.get('/image/download/:imageId/:resolution',validateRoute, downloadGeneratedImageById);

export default router;
