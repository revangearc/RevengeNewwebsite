import { NextRequest, NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/validation";
import { anonymousDailyHash, consumeRateLimit, deviceClass, safeReferrerHost } from "@/lib/request-privacy";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 16_384) return new NextResponse(null, { status: 413 });
  const parsed = analyticsEventSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid event." }, { status: 400 });

  const service = createSupabaseServiceClient();
  const anonymousHash = anonymousDailyHash(request);
  if (!service || !anonymousHash) return new NextResponse(null, { status: 204 });

  const rate = await consumeRateLimit(request, "analytics", 240, 600);
  if (!rate.allowed) return new NextResponse(null, { status: 204 });

  const userAgent = request.headers.get("user-agent") || "";
  const { event, path, details, utm } = parsed.data;
  const { error } = await service.from("analytics_events").insert({
    event_name: event,
    path,
    referrer_host: safeReferrerHost(request.headers.get("referer")),
    utm_source: utm.utm_source || null,
    utm_medium: utm.utm_medium || null,
    utm_campaign: utm.utm_campaign || null,
    utm_content: utm.utm_content || null,
    utm_term: utm.utm_term || null,
    device_class: deviceClass(userAgent),
    anonymous_daily_hash: anonymousHash,
    event_details: details,
  });

  return new NextResponse(null, { status: error ? 503 : 204 });
}
