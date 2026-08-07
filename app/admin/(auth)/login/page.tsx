import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Admin Sign In", robots: { index: false } };

export default function AdminLoginPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center py-20">
      <div className="w-full max-w-sm">
        <p className="text-center font-serif text-2xl tracking-[0.15em] text-ink">
          {SITE.name.toUpperCase()} ADMIN
        </p>
        <div className="mt-10">
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
}
