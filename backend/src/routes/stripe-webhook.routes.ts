import express, { Router } from "express";
import stripeWebhook from "../stripe/webhooks";

const router = Router();

router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;
