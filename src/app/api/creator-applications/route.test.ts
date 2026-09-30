import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { insert, limit } = vi.hoisted(() => ({ insert: vi.fn(), limit: vi.fn() }));
vi.mock("@/lib/request-privacy", () => ({ consumeRateLimit: limit }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServiceClient: () => ({ from: () => ({ insert }) }) }));
import { POST } from "./route";

const application = { fullName: "Website QA", email: "qa@example.com", phone: "", desiredCompensation: "", instagram: "", tiktok: "", motivation: "I create clear workout demonstrations for people who are building a manageable routine.", audienceDescription: "", consent: true, consentVersion: "creator-2026-09-29", companyWebsite: "", utmSource: "" };
function request(data: unknown) { return new NextRequest("https://example.com/api/creator-applications", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) }); }
beforeEach(() => { vi.clearAllMocks(); limit.mockResolvedValue({ configured: true, allowed: true }); insert.mockResolvedValue({ error: null }); });

describe("short creator application API", () => {
  it("maps blank optional answers to explicit, database-compatible missing-information notices", async () => {
    expect((await POST(request(application))).status).toBe(201);
    const record = insert.mock.calls[0][0];
    expect(record.audience_description).toBe("Audience details not supplied; discuss during review.");
    expect(record.audience_description.length).toBeGreaterThanOrEqual(30);
    expect(record.motivation.length).toBeGreaterThanOrEqual(40);
    expect(record.desired_compensation).toBe("Not supplied. Discuss during review.");
    expect(record.consent_version).toBe("creator-2026-09-29");
  });
  it("rejects invalid input before contacting the database", async () => {
    expect((await POST(request({ ...application, email: "invalid" }))).status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
    expect(limit).not.toHaveBeenCalled();
  });
  it("keeps honeypot submissions out of the database", async () => {
    expect((await POST(request({ ...application, companyWebsite: "spam.example" }))).status).toBe(202);
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects rate-limited applications without storage", async () => {
    limit.mockResolvedValue({ configured: true, allowed: false });
    expect((await POST(request(application))).status).toBe(429);
    expect(insert).not.toHaveBeenCalled();
  });

  it("reports unavailable configuration without claiming success", async () => {
    limit.mockResolvedValue({ configured: false, allowed: false });
    expect((await POST(request(application))).status).toBe(503);
    expect(insert).not.toHaveBeenCalled();
  });

  it("preserves and normalizes a full application with supplied optional answers", async () => {
    const full = { ...application, email: "QA@EXAMPLE.COM", phone: "555-0100", instagram: "@qa", tiktok: "@qaexample", desiredCompensation: "Discuss a paid partnership", audienceDescription: "Adults learning practical workout and nutrition habits.", utmSource: "tiktok" };
    expect((await POST(request(full))).status).toBe(201);
    expect(insert.mock.calls[0][0]).toMatchObject({ full_name: full.fullName, email: "qa@example.com", phone: full.phone, desired_compensation: full.desiredCompensation, instagram: full.instagram, tiktok: full.tiktok, motivation: full.motivation, audience_description: full.audienceDescription, utm_source: "tiktok" });
  });

  it("rejects oversized requests before parsing or storage", async () => {
    const oversized = request(application);
    oversized.headers.set("content-length", "30000");
    expect((await POST(oversized)).status).toBe(413);
    expect(insert).not.toHaveBeenCalled();
  });
});
