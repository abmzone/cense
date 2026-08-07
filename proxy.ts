import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const ACCOUNT_PUBLIC_PATHS = [
  "/account/login",
  "/account/signup",
  "/account/forgot-password",
  "/account/reset-password",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, supabase, user } = await updateSession(request);

  if (pathname.startsWith("/account") && !ACCOUNT_PUBLIC_PATHS.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL("/account/login", request.url));
    }
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
