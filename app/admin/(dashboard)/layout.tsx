import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/account/sign-out-button";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/");

  return (
    <section className="py-16">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl text-ink md:text-4xl">Admin</h1>
          <SignOutButton />
        </div>
        <div className="mt-10 flex flex-col gap-10 md:flex-row">
          <AdminNav />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </Container>
    </section>
  );
}
