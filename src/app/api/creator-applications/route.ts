import { NextRequest, NextResponse } from "next/server";
import { creatorApplicationSchema } from "@/lib/validation";
import { consumeRateLimit } from "@/lib/request-privacy";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const successMessage =
  "Your application is in. We’ll review it carefully and contact you directly if there is a fit.";

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 24_576)
    return NextResponse.json(
      { message: "The application is too large." },
      { status: 413 },
    );
  const parsed = creatorApplicationSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Review the application fields and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );

  if (parsed.data.companyWebsite)
    return NextResponse.json({ message: successMessage }, { status: 202 });

  const rate = await consumeRateLimit(request, "creator-application", 5, 3600);
  if (!rate.configured)
    return NextResponse.json(
      {
        message:
          "Applications are being connected. Please email revengearchelp@gmail.com for now.",
      },
      { status: 503 },
    );
  if (!rate.allowed)
    return NextResponse.json(
      { message: "Too many attempts. Please wait before trying again." },
      { status: 429 },
    );

  const service = createSupabaseServiceClient();
  if (!service)
    return NextResponse.json(
      { message: "Applications are temporarily unavailable." },
      { status: 503 },
    );
  const data = parsed.data;
  const { error } = await service.from("creator_applications").insert({
    full_name: data.fullName,
    email: data.email,
    phone: data.phone || null,
    desired_compensation:
      data.desiredCompensation || "Not supplied. Discuss during review.",
    instagram: data.instagram || null,
    tiktok: data.tiktok || null,
    motivation: data.motivation,
    audience_description:
      data.audienceDescription ||
      "Audience details not supplied; discuss during review.",
    consent_version: data.consentVersion,
    consented_at: new Date().toISOString(),
    utm_source: data.utmSource || null,
  });

  if (error?.code === "23505")
    return NextResponse.json(
      { message: "An application for this email has already been received." },
      { status: 409 },
    );
  if (error)
    return NextResponse.json(
      { message: "We could not submit your application. Please try again." },
      { status: 503 },
    );
  return NextResponse.json({ message: successMessage }, { status: 201 });
}
