import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";

const document = legalBySlug["open-source-notices"];
export const metadata: Metadata = { title: document.title, description: document.description, alternates: { canonical: "/open-source-notices" } };
export default function Page() { return <LegalDocument document={document} />; }
