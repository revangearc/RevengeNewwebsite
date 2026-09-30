import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { adminApplicationUpdateSchema } from "@/lib/validation";
import { getAuthorizedAdmin } from "@/lib/supabase/server";

const idSchema = z.string().uuid();

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const { id } = await context.params;
  if (!idSchema.safeParse(id).success) return NextResponse.json({ message: "Invalid application." }, { status: 400 });
  const parsed = adminApplicationUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid update." }, { status: 400 });

  const update: Record<string, unknown> = {};
  if (parsed.data.status) {
    update.status = parsed.data.status;
    update.reviewer = admin.user.id;
    update.reviewed_at = new Date().toISOString();
  }
  if (parsed.data.privateNotes !== undefined) update.private_notes = parsed.data.privateNotes;
  if (parsed.data.archived !== undefined) update.archived_at = parsed.data.archived ? new Date().toISOString() : null;

  const { data, error } = await admin.service.from("creator_applications").update(update).eq("id", id).select("*").single();
  if (error) return NextResponse.json({ message: "The application could not be updated." }, { status: 503 });
  return NextResponse.json({ application: data });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const { id } = await context.params;
  if (!idSchema.safeParse(id).success) return NextResponse.json({ message: "Invalid application." }, { status: 400 });
  const body = (await request.json().catch(() => null)) as { confirmation?: string } | null;
  const { data: application } = await admin.service.from("creator_applications").select("email").eq("id", id).maybeSingle();
  if (!application) return NextResponse.json({ message: "Application not found." }, { status: 404 });
  if (body?.confirmation !== `DELETE ${application.email}`) return NextResponse.json({ message: "The deletion confirmation does not match." }, { status: 400 });
  const { error } = await admin.service.from("creator_applications").delete().eq("id", id);
  if (error) return NextResponse.json({ message: "The application could not be deleted." }, { status: 503 });
  return NextResponse.json({ message: "Application permanently deleted." });
}
