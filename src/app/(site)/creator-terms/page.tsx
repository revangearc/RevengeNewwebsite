import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";

const document = legalBySlug["creator-terms"];
export const metadata: Metadata = { title: document.title, description: document.description, alternates: { canonical: "/creator-terms" } };

export default function Page() {
  return <LegalDocument document={document} />;
}
