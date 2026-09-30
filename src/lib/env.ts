export const publicSupabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "",
};

export function hasPublicSupabaseConfig() {
  return Boolean(publicSupabaseConfig.url && publicSupabaseConfig.anonKey);
}

export function hasServiceSupabaseConfig() {
  return Boolean(hasPublicSupabaseConfig() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}

export function getAdminLoginConfig() {
  return {
    username: process.env.ADMIN_LOGIN_USERNAME?.trim().toLowerCase() || "",
    authEmail: process.env.ADMIN_AUTH_EMAIL?.trim().toLowerCase() || "",
  };
}

export function hasAdminAuthConfig() {
  const { username, authEmail } = getAdminLoginConfig();
  return Boolean(hasServiceSupabaseConfig() && username && authEmail);
}

export function getAdminAllowlist() {
  return new Set(
    (process.env.ADMIN_EMAIL_ALLOWLIST || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}
