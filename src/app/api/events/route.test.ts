import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  anonymousDailyHash: vi.fn(),
  consumeRateLimit: vi.fn(),
  deviceClass: vi.fn(),
  insert: vi.fn(),
  safeReferrerHost: vi.fn(),
}));

vi.mock("@/lib/request-privacy", () => ({
  anonymousDailyHash: mocks.anonymousDailyHash,
  consumeRateLimit: mocks.consumeRateLimit,
  deviceClass: mocks.deviceClass,
  safeReferrerHost: mocks.safeReferrerHost,
}));

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServiceClient: () => ({
    from: () => ({ insert: mocks.insert }),
  }),
}));

import { POST } from "./route";

function requestFor(body: unknown) {
  return new NextRequest("http://localhost:3000/api/events?utm_source=tiktok", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      referer: "https://www.tiktok.com/@revengearc",
      "user-agent": "Mobile Safari",
      "x-forwarded-for": "203.0.113.10",
    },
    body: JSON.stringify(body),
  });
}

const validEvent = {
  event: "page_view",
  path: "/features",
  details: { placement: "navigation" },
  utm: { utm_source: "tiktok" },
};

describe("POST /api/events", () => {
  beforeEach(() => {
    mocks.anonymousDailyHash.mockReset().mockReturnValue("a".repeat(40));
    mocks.consumeRateLimit.mockReset().mockResolvedValue({ allowed: true, configured: true });
    mocks.deviceClass.mockReset().mockReturnValue("mobile");
    mocks.safeReferrerHost.mockReset().mockReturnValue("www.tiktok.com");
    mocks.insert.mockReset().mockResolvedValue({ error: null });
  });

  it("rejects non-allowlisted events before storage", async () => {
    const response = await POST(requestFor({ ...validEvent, event: "raw_mouse_move" }));
    expect(response.status).toBe(400);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("quietly drops events over the rate limit", async () => {
    mocks.consumeRateLimit.mockResolvedValue({ allowed: false, configured: true });
    const response = await POST(requestFor(validEvent));
    expect(response.status).toBe(204);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("stores only derived privacy-safe event fields", async () => {
    const response = await POST(requestFor(validEvent));
    expect(response.status).toBe(204);
    expect(mocks.insert).toHaveBeenCalledWith({
      event_name: "page_view",
      path: "/features",
      referrer_host: "www.tiktok.com",
      utm_source: "tiktok",
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      device_class: "mobile",
      anonymous_daily_hash: "a".repeat(40),
      event_details: { placement: "navigation" },
    });
  });
});
