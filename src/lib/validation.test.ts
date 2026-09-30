import { describe, expect, it } from "vitest";
import {
  adminLoginSchema,
  analyticsEventSchema,
  creatorApplicationSchema,
} from "./validation";

const validCreator = {
  fullName: "Marlin Carter",
  email: "MARLIN@example.com",
  phone: "",
  desiredCompensation: "Open to a paid creator partnership",
  instagram: "@marlintrains",
  tiktok: "",
  motivation:
    "I make clear training content and want to help people build consistency without overpromising results.",
  audienceDescription:
    "A growing audience of beginner and intermediate lifters who value practical strength guidance.",
  consent: true,
  consentVersion: "creator-2026-08-17",
  companyWebsite: "",
  utmSource: "tiktok",
} as const;

describe("creatorApplicationSchema", () => {
  it("accepts and normalizes a complete application", () => {
    const result = creatorApplicationSchema.parse(validCreator);
    expect(result.email).toBe("marlin@example.com");
  });

  it("requires consent", () => {
    const result = creatorApplicationSchema.safeParse({
      ...validCreator,
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a short application with optional context left blank", () => {
    const result = creatorApplicationSchema.parse({
      ...validCreator,
      desiredCompensation: "",
      audienceDescription: "",
      phone: "",
    });
    expect(result.audienceDescription).toBe("");
    expect(result.desiredCompensation).toBe("");
  });

  it("keeps optional audience input compatible with the live database minimum", () => {
    expect(
      creatorApplicationSchema.safeParse({
        ...validCreator,
        audienceDescription: "Too short",
      }).success,
    ).toBe(false);
  });

  it("preserves a bounded honeypot value for silent API handling", () => {
    const result = creatorApplicationSchema.safeParse({
      ...validCreator,
      companyWebsite: "spam.example",
    });
    expect(result.success).toBe(true);
  });
});

describe("analyticsEventSchema", () => {
  it("accepts an allowlisted event", () => {
    expect(
      analyticsEventSchema.safeParse({
        event: "page_view",
        path: "/features",
        details: {},
        utm: {},
      }).success,
    ).toBe(true);
  });

  it("rejects arbitrary event names", () => {
    expect(
      analyticsEventSchema.safeParse({
        event: "raw_mouse_move",
        path: "/",
        details: {},
        utm: {},
      }).success,
    ).toBe(false);
  });

  it("bounds detail fields", () => {
    const details = Object.fromEntries(
      Array.from({ length: 13 }, (_, index) => [`item-${index}`, index]),
    );
    expect(
      analyticsEventSchema.safeParse({
        event: "page_view",
        path: "/",
        details,
        utm: {},
      }).success,
    ).toBe(false);
  });
});

describe("adminLoginSchema", () => {
  it("normalizes a valid username", () => {
    const result = adminLoginSchema.parse({
      username: "  Bashar1212  ",
      password: "long-enough-password",
    });
    expect(result.username).toBe("bashar1212");
  });

  it("rejects email-shaped and malformed usernames", () => {
    expect(
      adminLoginSchema.safeParse({
        username: "owner@example.com",
        password: "long-enough-password",
      }).success,
    ).toBe(false);
  });
});
