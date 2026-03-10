import { Separator } from "@/registry/new-york/ui/separator";
import CurrentBilling from "./currentBilling";

const BillingPage = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          Billing
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm max-w-2xl">
          Manage your payment methods, and update billing details. You can add
          or remove cards and change your plan from the billing portal.
        </p>
      </div>
      <Separator />
      <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm sm:p-6">
        <CurrentBilling />
      </div>
    </div>
  );
};

export default BillingPage;
