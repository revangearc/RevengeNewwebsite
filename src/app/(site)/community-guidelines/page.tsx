import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";
export const metadata: Metadata = { title: "Community Guidelines", description: legalBySlug["community-guidelines"].description, alternates: { canonical: "/community-guidelines" } };
export default function Page() { return <LegalDocument document={legalBySlug["community-guidelines"]} />; }
