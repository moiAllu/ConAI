import React, { Suspense } from "react";
import PasswordResetForm from "./components/form";

const PasswordReset = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        }
      >
        <PasswordResetForm />
      </Suspense>
    </div>
  );
};

export default PasswordReset;
