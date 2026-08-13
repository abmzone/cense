import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { AccountNav } from "@/components/account/account-nav";
import { SignOutButton } from "@/components/account/sign-out-button";
import { createClient } from "@/lib/supabase/server";
import { claimGuestOrders } from "@/lib/data/orders";

export default async function AccountDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account/login");

  if (user.email) {
    try {
      await claimGuestOrders(user.id, user.email);
    } catch {
      // Non-fatal — worst case, guest orders stay unclaimed until the next visit.
    }
  }

  return (
    <section className="py-20">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-4xl text-ink md:text-5xl">My Account</h1>
          <SignOutButton />
        </div>
        <div className="mt-14 flex flex-col gap-10 md:flex-row">
          <AccountNav />
          <div className="flex-1">{children}</div>
        </div>
      </Container>
    </section>
  );
}
