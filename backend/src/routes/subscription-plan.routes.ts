import express, { Request, Response } from 'express';
import { validateRoute } from '../helpers';
import { addSubscriptionPlan, createSubscription,createCheckoutSession, getSubscriptionPlans, retreiveCheckoutSession,getUserSubscriptionDetail, createBillingPortalSession } from '../controllers';

const router = express.Router();

// router.post('/subscription-plan/add',validateRoute, addSubscriptionPlan);
// router.post("/subscription/create", createSubscription);

router.post("/checkout-session/:priceId",validateRoute, createCheckoutSession )
router.get('/retreive-checkout-session/:sessionId/:userId', retreiveCheckoutSession)
router.get("/all-plans", validateRoute, getSubscriptionPlans)
router.get("/user-subscription/:userId", validateRoute, getUserSubscriptionDetail)
router.get('/create-billing-portal-session/:customerId', validateRoute, createBillingPortalSession)
export default router;