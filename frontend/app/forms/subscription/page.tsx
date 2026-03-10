import { Separator } from "@/registry/new-york/ui/separator";
import ManageSubscription from "./manageSubscription";

const SubscriptionPage = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          Subscription
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          View your current plan, payment details, and manage billing.
        </p>
      </div>
      <Separator />
      <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm sm:p-6">
        <ManageSubscription
          name="Basic"
          description="lorem ipsum"
          price={10}
          nextBill={Date.now()}
          last4CardNums="2313"
        />
      </div>
    </div>
  );
};

export default SubscriptionPage;
