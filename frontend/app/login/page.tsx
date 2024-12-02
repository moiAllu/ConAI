import LoginForm from "./components/loginForm";
import { Suspense } from "react";

export default function Login() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
