import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { legalBySlug } from "@/content/legal";
export const metadata: Metadata = { title: "Subscriptions & Refunds", description: legalBySlug["subscriptions-refunds"].description, alternates: { canonical: "/subscriptions-refunds" } };
export default function Page() { return <LegalDocument document={legalBySlug["subscriptions-refunds"]} />; }
