import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";
export const metadata: Metadata = { title: "Privacy Policy", description: legalBySlug.privacy.description, alternates: { canonical: "/privacy" } };
export default function Page() { return <LegalDocument document={legalBySlug.privacy} />; }
