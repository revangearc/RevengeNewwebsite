import { NextResponse } from "next/server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";

function csvValue(value: unknown) {
  const text = value == null ? "" : String(value);
  const spreadsheetSafe = /^[=+\-@\t\r]/.test(text.trimStart()) ? `'${text}` : text;
  return `"${spreadsheetSafe.replaceAll('"', '""')}"`;
}

export async function GET() {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const { data, error } = await admin.service.from("creator_applications").select("*").order("submitted_at", { ascending: false }).limit(10_000);
  if (error) return NextResponse.json({ message: "Export failed." }, { status: 503 });
  const headers = ["submitted_at", "full_name", "email", "phone", "desired_compensation", "instagram", "tiktok", "motivation", "audience_description", "utm_source", "status", "private_notes", "reviewed_at", "archived_at"];
  const rows = (data || []).map((item) => headers.map((header) => csvValue(item[header])).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  return new NextResponse(csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="revenge-arc-creator-applications-${new Date().toISOString().slice(0, 10)}.csv"`, "cache-control": "private, no-store" } });
}
