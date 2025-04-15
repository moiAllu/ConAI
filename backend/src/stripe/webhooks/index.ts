import { Response, Request } from "express";
import {
  createUserSubscription,
  deleteUserSubscription,
  updateUserSubscription,
} from "../../services/subscriptionDetail";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);
import { UserModel } from "../../mongodb/models";
import {
  addPaymentMethod,
  createStripeCustomerDetail,
  getStripeCustomerDetailByCustomerId,
  updateStripeCustomerDetail,
  deleteStripeCustomerDetail,
} from "../../services/stripeCustomerDetail";

const stripeWebhook = async (req: Request, res: Response) => {
  const event = req.body;
  console.log("event", event.type);
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        let user = await UserModel.findOne({
          email: session.customer_email,
        });
        if (!user) {
          return res.status(400).json({
            message: "User not found",
            status: 400,
          });
        }
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        );

        await createUserSubscription({
          user_id: user._id,
          stripe_subscription_id: session.subscription,
          stripe_customer_id: session.customer,
          subscription_plan_price_id: subscription.plan.id,
          current_plan: session.amount_total === 1000 ? "basic" : "pro",
          status: subscription.status,
          plan_amount: session.amount_total,
          plan_amount_currency: session.currency,
          plan_interval: subscription.plan.interval,
          plan_interval_count: subscription.plan.interval_count,
          plan_period_start: new Date(subscription.current_period_start * 1000),
          plan_period_end: new Date(subscription.current_period_end * 1000),
          trial_end: subscription.trial_end
            ? new Date(subscription.trial_end * 1000)
            : null,
        });
        user.plan = session.amount_total === 1000 ? "basic" : "pro";
        user.stripe_subscription_id = session.subscription;
        await user.save();
        break;
      case "subscription_schedule.created":
        const subscription_schedule = event.data.object;
        // console.log("subscription_schedule", subscription_schedule);
        break;
      case "subscription_schedule.updated":
        const subscription_schedule_update = event.data.object;
        // console.log(
        //   "subscription_schedule_update",
        //   subscription_schedule_update
        // );
        break;
      case "customer.subscription.updated":
        const updatedSubscription = event.data.object;
        await updateUserSubscription({
          stripe_subscription_id: updatedSubscription.id,
          status: updatedSubscription.status,
          cancel_at:
            (updatedSubscription.cancel_at &&
              new Date(updatedSubscription.cancel_at * 1000)) ||
            null,
          cancel: updatedSubscription.cancel_at_period_end,
          plan_amount: updatedSubscription.plan.amount,
          current_plan:
            (updatedSubscription.plan.amount === 1000 && "basic") ||
            (updatedSubscription.plan.amount === 1600 && "pro") ||
            "free",
        });
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object;
        console.log("deletedSubscription", deletedSubscription);
        if (!deletedSubscription.id) {
          return;
        }
        await deleteUserSubscription({
          stripe_subscription_id: deletedSubscription.id,
        });
        await deleteStripeCustomerDetail(deletedSubscription.customer);
        break;
      case "customer.deleted":
        const deletedCustomer = event.data.object;
        if (!deletedCustomer.id) {
          return;
        }
        await deleteStripeCustomerDetail(deletedCustomer.id);
        break;
      case "payment_method.attached":
        const attachedMethod = event.data.object;
        if (!attachedMethod.id) {
          return;
        }
        const customerDetail = await getStripeCustomerDetailByCustomerId(
          attachedMethod.customer
        );

        if (!customerDetail) {
          const user = await UserModel.findOne({
            email: attachedMethod.billing_details.email,
          });
          if (!user) {
            return res.status(400).json({
              message: "User not found",
              status: 400,
            });
          }
          await createStripeCustomerDetail({
            user_id: user._id,
            stripe_customer_id: attachedMethod.customer,
            default_payment_method: attachedMethod.id,
            email: user.email,
            name: user.name,
            payment_detail: [
              {
                payment_method: attachedMethod.id,
                payment_method_details: {
                  card: {
                    brand: attachedMethod.card.brand,
                    last4: attachedMethod.card.last4,
                    exp_month: attachedMethod.card.exp_month,
                    exp_year: attachedMethod.card.exp_year,
                    fingerprint: attachedMethod.card.fingerprint,
                  },
                },
              },
            ],
          });
          return;
        }
        await addPaymentMethod(customerDetail.stripe_customer_id, {
          payment_method: attachedMethod.id,
          payment_method_details: {
            card: {
              brand: attachedMethod.card.brand,
              last4: attachedMethod.card.last4,
              exp_month: attachedMethod.card.exp_month,
              exp_year: attachedMethod.card.exp_year,
              fingerprint: attachedMethod.card.fingerprint,
            },
          },
        });
        break;
      case "customer.updated":
        const updatedCustomer = event.data.object;
        if (!updatedCustomer.id) {
          return;
        }
        await updateStripeCustomerDetail(updatedCustomer.id, {
          email: updatedCustomer.email,
          name: updatedCustomer.name,
          phone: updatedCustomer.phone,
          address: {
            city: updatedCustomer.address.city,
            country: updatedCustomer.address.country,
            line1: updatedCustomer.address.line1,
            line2: updatedCustomer.address.line2,
          },
        });
        break;
    }
    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook handling failed" });
  }
};

export default stripeWebhook;
