import React from "react";
import ManageSubscription from "./manageSubscription";

const SubscriptionPage = () => {
  return (
    <div className="w-full h-full">
      <ManageSubscription
        name={"Basic"}
        description={"lorem ipsum"}
        price={10}
        nextBill={Date.now()}
        last4CardNums={"2313"}
      />
    </div>
  );
};

export default SubscriptionPage;
