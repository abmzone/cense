import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Attaches any guest orders placed under this email (user_id still null,
 * e.g. checked out without an account) to the now-signed-in user, so they
 * show up in the account order history. Safe to call on every dashboard
 * load — becomes a no-op once there's nothing left to claim.
 */
export async function claimGuestOrders(userId: string, email: string) {
  const admin = createAdminClient();
  await admin
    .from("orders")
    .update({ user_id: userId })
    .is("user_id", null)
    .ilike("email", email);
}
