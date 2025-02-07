import SignUpForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your InsightFlow account and start collecting customer feedback",
  robots: {
    index: true,
    follow: true,
  },
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
