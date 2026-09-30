import Link from "next/link";
import { legalDocumentGroups } from "@/content/legal";
import { SUPPORT_EMAIL, navItems } from "@/content/site";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#040309] py-10 sm:py-14">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
      />
      <div className="content-shell grid gap-10 lg:grid-cols-[.8fr_.45fr_1.75fr]">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
            Train harder. Eat smarter. Become your best.
          </p>
          <Link
            href="/consumer-health-data"
            className="mt-4 inline-flex min-h-11 items-center text-sm text-cyan-200 underline underline-offset-4"
          >
            Consumer Health Data Privacy Notice
          </Link>
        </div>
        <div>
          <p className="utility-text text-[0.65rem] text-zinc-500">Explore</p>
          <ul className="footer-link-list mt-3 grid grid-cols-2 text-sm text-zinc-300 lg:grid-cols-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:text-white" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="utility-text text-[0.65rem] text-zinc-500">
            Legal Center
          </p>
          <div className="mt-3 grid gap-1">
            {legalDocumentGroups.map((group) => (
              <details key={group.category} className="footer-group">
                <summary>
                  {group.category}
                  <span aria-hidden="true">+</span>
                </summary>
                <ul className="footer-link-list mb-3 grid text-sm text-zinc-300">
                  {group.documents.map((document) => (
                    <li key={document.slug}>
                      <Link
                        className="hover:text-white"
                        href={`/${document.slug}`}
                      >
                        {document.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </div>
      <div className="content-shell mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin"
          prefetch={false}
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#040309]"
        >
          © 2026 Revenge Arc. All rights reserved.
        </Link>
        <a className="hover:text-white" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
      </div>
      <p className="content-shell mt-4 text-[0.65rem] leading-5 text-zinc-500">
        Apple, the Apple logo, iPhone, and Apple Watch are trademarks of Apple
        Inc., registered in the U.S. and other countries. App Store is a service
        mark of Apple Inc. Google Play and the Google Play logo are trademarks
        of Google LLC.
      </p>
    </footer>
  );
}
