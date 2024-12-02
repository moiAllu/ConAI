import React, { Suspense } from "react";
import PasswordResetForm from "./components/form";

const PasswordReset = () => {
  return (
    <div className="w-screen h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <PasswordResetForm />
      </Suspense>
    </div>
  );
};

export default PasswordReset;
