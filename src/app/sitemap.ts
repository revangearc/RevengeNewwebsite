import type { MetadataRoute } from "next";
import { legalDocuments } from "@/content/legal";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/features", "/pricing", "/creators", "/faq", "/legal", "/contact", ...legalDocuments.map((document) => `/${document.slug}`)];
  return pages.map((path) => ({ url: absoluteUrl(path || "/"), lastModified: new Date("2026-09-25"), changeFrequency: path ? "monthly" : "weekly", priority: path ? 0.7 : 1 }));
}
