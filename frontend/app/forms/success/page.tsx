import { Suspense } from "react";
import CheckoutSession from "./checkoutSession";
const SuccessPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutSession />
      </Suspense>
    </div>
  );
};

export default SuccessPage;
