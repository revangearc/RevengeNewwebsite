import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";
export const metadata: Metadata = { title: "Cookies & Website Storage", description: legalBySlug.cookies.description, alternates: { canonical: "/cookies" } };
export default function Page() { return <LegalDocument document={legalBySlug.cookies} />; }
