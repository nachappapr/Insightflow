import LoginForm from "@/components/forms/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
