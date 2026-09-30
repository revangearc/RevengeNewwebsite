import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getAdminAllowlist, hasPublicSupabaseConfig, hasServiceSupabaseConfig, publicSupabaseConfig } from "@/lib/env";

export async function createSupabaseUserClient() {
  if (!hasPublicSupabaseConfig()) return null;
  const cookieStore = await cookies();

  return createServerClient(publicSupabaseConfig.url, publicSupabaseConfig.anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot always mutate cookies. proxy.ts refreshes sessions.
        }
      },
    },
  });
}

export function createSupabaseServiceClient() {
  if (!hasServiceSupabaseConfig()) return null;
  return createClient(publicSupabaseConfig.url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function getAuthorizedAdmin() {
  const userClient = await createSupabaseUserClient();
  if (!userClient) return null;
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return null;

  const allowlist = getAdminAllowlist();
  if (!user.email || !allowlist.has(user.email.toLowerCase())) return null;

  const service = createSupabaseServiceClient();
  if (!service) return null;
  const { data: profile } = await service
    .from("admin_profiles")
    .select("user_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile || !["owner", "admin"].includes(profile.role)) return null;
  return { user, profile, service };
}
