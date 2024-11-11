import React from "react";
import PaymentMethod from "./paymentMethod";
import CurrentBilling from "./currentBilling";

const BillingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Update your billing settings. Add multiple bulling options.
        </p>
      </div>

      <CurrentBilling />
    </div>
  );
};

export default BillingPage;
