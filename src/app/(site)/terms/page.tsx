import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";
export const metadata: Metadata = { title: "Terms of Service", description: legalBySlug.terms.description, alternates: { canonical: "/terms" } };
export default function Page() { return <LegalDocument document={legalBySlug.terms} />; }
