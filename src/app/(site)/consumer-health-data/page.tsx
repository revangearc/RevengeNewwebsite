import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";

const document = legalBySlug["consumer-health-data"];
export const metadata: Metadata = { title: document.title, description: document.description, alternates: { canonical: "/consumer-health-data" } };

export default function Page() {
  return <LegalDocument document={document} />;
}
