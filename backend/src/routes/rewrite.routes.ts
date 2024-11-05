import express, { Request, Response } from 'express';
import { validateRoute } from '../helpers';
import { rewriter } from '../rewriter';
import { rewriteController , getUserRewriteHistory, getUserRewriteById, deleteUserRewriteById} from '../controllers';

const router = express.Router();

router.post('/rewrite/new',validateRoute, rewriteController);
router.get('/rewrite/rewrites/:userId',validateRoute, getUserRewriteHistory);
router.get('/rewrite/:userId/:rewriteId',validateRoute, getUserRewriteById);
router.delete('/rewrite/:userId/:rewriteId',validateRoute, deleteUserRewriteById);

export default router;
