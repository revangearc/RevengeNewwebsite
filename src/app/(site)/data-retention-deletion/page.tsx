import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";

const document = legalBySlug["data-retention-deletion"];
export const metadata: Metadata = { title: document.title, description: document.description, alternates: { canonical: "/data-retention-deletion" } };
export default function Page() { return <LegalDocument document={document} />; }
