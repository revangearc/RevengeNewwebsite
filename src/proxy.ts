import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminAllowlist, hasPublicSupabaseConfig, publicSupabaseConfig } from "@/lib/env";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "private, no-store");

  if (!hasPublicSupabaseConfig()) {
    if (request.nextUrl.pathname === "/admin/login") return response;
    const login = new URL("/admin/login?setup=1", request.url);
    return NextResponse.redirect(login);
  }

  const supabase = createServerClient(publicSupabaseConfig.url, publicSupabaseConfig.anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
        response.headers.set("Cache-Control", "private, no-store");
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const isLogin = request.nextUrl.pathname === "/admin/login";
  if (!user) {
    if (isLogin) return response;
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  const allowlist = getAdminAllowlist();
  const emailAllowed = Boolean(user.email && allowlist.has(user.email.toLowerCase()));
  const { data: profile } = await supabase.from("admin_profiles").select("role").eq("user_id", user.id).maybeSingle();
  const authorized = emailAllowed && Boolean(profile && ["owner", "admin"].includes(profile.role));

  if (!authorized) {
    await supabase.auth.signOut();
    const login = new URL("/admin/login?error=not-authorized", request.url);
    return NextResponse.redirect(login);
  }

  if (isLogin) return NextResponse.redirect(new URL("/admin", request.url));
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
