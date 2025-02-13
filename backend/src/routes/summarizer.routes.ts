import express from "express";
import { validateRoute } from "../helpers";

import {
  createSummarizer,
  getSummarizerByUserIdController,
  getSummarizerHistoryContorller,
  deleteSummarizerByIdController,
} from "../controllers";

const router = express.Router();

router.post("/summarizer/create", validateRoute, createSummarizer);
router.get(
  "/summarizer/summarizes/:userId",
  validateRoute,
  getSummarizerHistoryContorller
);
router.get(
  "/summarizer/:userId/:summarizeId",
  validateRoute,
  getSummarizerByUserIdController
);
router.delete(
  "/summarizer/:summarizeId/:userId",
  validateRoute,
  deleteSummarizerByIdController
);

export default router;
