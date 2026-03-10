import React from "react";
import AllPlans from "./allplans";

const PlansPage = () => {
  return (
    <div className=" w-full space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          Plans
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Choose a plan that fits your usage. Upgrade or change anytime.
        </p>
      </div>
      <div className=" w-full rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm sm:p-6">
        <AllPlans />
      </div>
    </div>
  );
};
export default PlansPage;
