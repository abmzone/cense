import type { Metadata } from "next";
import { SignupForm } from "@/components/account/signup-form";

export const metadata: Metadata = { title: "Create Account", robots: { index: false } };

export default function SignupPage() {
  return <SignupForm />;
}
