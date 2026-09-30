import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";

const document = legalBySlug["ai-data-processing"];
export const metadata: Metadata = { title: document.title, description: document.description, alternates: { canonical: "/ai-data-processing" } };
export default function Page() { return <LegalDocument document={document} />; }
