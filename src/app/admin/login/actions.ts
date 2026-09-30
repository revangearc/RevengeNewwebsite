"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAllowlist, getAdminLoginConfig, hasAdminAuthConfig } from "@/lib/env";
import { consumeRateLimitForHeaders } from "@/lib/request-privacy";
import { createSupabaseServiceClient, createSupabaseUserClient } from "@/lib/supabase/server";
import { adminLoginSchema } from "@/lib/validation";

export type LoginState = { message: string };

const invalidAdminIdentity = "invalid-admin@admin.revengearc.invalid";
const invalidCredentialsMessage = "The username or password is incorrect.";

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  if (!hasAdminAuthConfig()) return { message: "Admin authentication is not configured in this environment yet." };
  const parsed = adminLoginSchema.safeParse({ username: formData.get("username"), password: formData.get("password") });
  if (!parsed.success) return { message: invalidCredentialsMessage };

  const rate = await consumeRateLimitForHeaders(await headers(), "admin-login", 8, 900);
  if (!rate.configured) return { message: "Admin sign-in is temporarily unavailable." };
  if (!rate.allowed) return { message: "Too many sign-in attempts. Wait 15 minutes and try again." };

  const supabase = await createSupabaseUserClient();
  const service = createSupabaseServiceClient();
  if (!supabase || !service) return { message: "The admin connection is incomplete." };

  const loginConfig = getAdminLoginConfig();
  const usernameMatches = parsed.data.username === loginConfig.username;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: usernameMatches ? loginConfig.authEmail : invalidAdminIdentity,
    password: parsed.data.password,
  });
  if (error || !data.user || !usernameMatches) return { message: invalidCredentialsMessage };

  const allowlist = getAdminAllowlist();
  if (!data.user.email || !allowlist.has(data.user.email.toLowerCase())) {
    await supabase.auth.signOut();
    return { message: invalidCredentialsMessage };
  }
  const { data: profile } = await service.from("admin_profiles").select("role").eq("user_id", data.user.id).maybeSingle();
  if (!profile || !["owner", "admin"].includes(profile.role)) {
    await supabase.auth.signOut();
    return { message: invalidCredentialsMessage };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseUserClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}
