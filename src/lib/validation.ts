import { z } from "zod";

const optionalHandle = z
  .string()
  .trim()
  .max(80, "Keep this under 80 characters.")
  .optional()
  .or(z.literal(""));

export const creatorApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Keep your name under 120 characters."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address.")
    .max(254),
  phone: z
    .string()
    .trim()
    .max(40, "Keep the phone number under 40 characters.")
    .optional()
    .or(z.literal("")),
  desiredCompensation: z.string().trim().max(300).optional().default(""),
  instagram: optionalHandle,
  tiktok: optionalHandle,
  motivation: z
    .string()
    .trim()
    .min(40, "Please share at least 40 characters.")
    .max(2500),
  audienceDescription: z
    .string()
    .trim()
    .max(2500)
    .refine(
      (value) => value === "" || value.length >= 30,
      "Add at least 30 characters, or leave this optional field blank.",
    )
    .optional()
    .default(""),
  consent: z.literal(true, {
    error: "Consent is required to submit an application.",
  }),
  consentVersion: z.string().trim().min(1).max(40),
  companyWebsite: z.string().max(200).optional().or(z.literal("")),
  utmSource: z.string().trim().max(120).optional().or(z.literal("")),
});

export const approvedEventNames = [
  "page_view",
  "app_store_click",
  "pricing_plan_click",
  "creator_cta",
  "creator_form_start",
  "creator_submission",
] as const;

const safeDetail = z.union([
  z.string().max(200),
  z.number().finite(),
  z.boolean(),
  z.null(),
]);

export const analyticsEventSchema = z.object({
  event: z.enum(approvedEventNames),
  path: z.string().trim().startsWith("/").max(300),
  details: z
    .record(z.string().max(80), safeDetail)
    .refine(
      (value) => Object.keys(value).length <= 12,
      "Too many detail fields.",
    )
    .default({}),
  utm: z
    .object({
      utm_source: z.string().max(120).optional(),
      utm_medium: z.string().max(120).optional(),
      utm_campaign: z.string().max(120).optional(),
      utm_content: z.string().max(120).optional(),
      utm_term: z.string().max(120).optional(),
    })
    .partial()
    .default({}),
});

export const creatorStatusSchema = z.enum([
  "new",
  "reviewing",
  "approved",
  "rejected",
]);

export const adminApplicationUpdateSchema = z
  .object({
    status: creatorStatusSchema.optional(),
    privateNotes: z.string().trim().max(5000).optional(),
    archived: z.boolean().optional(),
  })
  .refine(
    (value) => Object.values(value).some((item) => item !== undefined),
    "No update supplied.",
  );

export const adminLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(64)
    .regex(/^[a-z0-9._-]+$/),
  password: z.string().min(8).max(200),
});

export type CreatorApplicationInput = z.infer<typeof creatorApplicationSchema>;
export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
