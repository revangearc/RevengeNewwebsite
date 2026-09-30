import "server-only";

import { createHmac } from "node:crypto";
import type { NextRequest } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

type HeaderReader = Pick<Headers, "get">;

function requestAddress(headers: HeaderReader) {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || headers.get("x-real-ip")?.trim()
    || "unknown";
}

function hashValue(value: string, scope: string) {
  const secret = process.env.ANALYTICS_HASH_SECRET?.trim();
  if (!secret) return null;
  return createHmac("sha256", secret).update(`${scope}|${value}`).digest("hex").slice(0, 40);
}

export function anonymousDailyHash(request: NextRequest) {
  const day = new Date().toISOString().slice(0, 10);
  const userAgent = request.headers.get("user-agent") || "unknown";
  return hashValue(`${requestAddress(request.headers)}|${userAgent}`, `visitor:${day}`);
}

export function deviceClass(userAgent: string) {
  if (/ipad|tablet/i.test(userAgent)) return "tablet";
  if (/mobi|android|iphone/i.test(userAgent)) return "mobile";
  return "desktop";
}

export function safeReferrerHost(raw: string | null) {
  if (!raw) return null;
  try {
    return new URL(raw).hostname.slice(0, 253);
  } catch {
    return null;
  }
}

export async function consumeRateLimitForHeaders(headers: HeaderReader, kind: string, limit: number, windowSeconds: number) {
  const service = createSupabaseServiceClient();
  const window = Math.floor(Date.now() / (windowSeconds * 1000));
  const key = hashValue(requestAddress(headers), `rate:${kind}:${window}`);
  if (!service || !key) return { allowed: false, configured: false };

  const { data, error } = await service.rpc("consume_rate_limit", {
    p_bucket_key: key,
    p_kind: kind,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });

  if (error) return { allowed: false, configured: true };
  return { allowed: Boolean(data), configured: true };
}

export function consumeRateLimit(request: NextRequest, kind: string, limit: number, windowSeconds: number) {
  return consumeRateLimitForHeaders(request.headers, kind, limit, windowSeconds);
}
