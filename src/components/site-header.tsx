"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/content/site";
import { BrandMark } from "./brand-mark";
import { DownloadAction } from "./download-action";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    }
    const frame = requestAnimationFrame(() => {
      if (open)
        drawerRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
    const handleKey = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-2 pt-2 sm:px-4">
      <div className="mx-auto flex h-[var(--header-height)] max-w-[96rem] items-center border border-white/20 bg-[#050409]/88 px-3 shadow-[0_12px_50px_rgba(0,0,0,.44)] backdrop-blur-xl [clip-path:polygon(1.4rem_0,calc(100%_-_1.4rem)_0,100%_50%,calc(100%_-_1.4rem)_100%,1.4rem_100%,0_50%)] sm:px-5">
        <BrandMark />
        <nav
          className="ml-auto hidden items-center lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-11 items-center px-5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-5 bottom-1.5 h-px bg-violet-400 shadow-[0_0_12px_#a855f7]"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="ml-3 hidden xl:block">
          <DownloadAction placement="header" />
        </div>
        <button
          ref={triggerRef}
          type="button"
          className="ml-auto grid size-12 place-items-center border-l border-white/15 text-white lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={26} weight="bold" />
          ) : (
            <List size={28} weight="bold" />
          )}
        </button>
      </div>

      {open && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 top-[calc(var(--header-height)+.5rem)] z-[-1] overflow-y-auto overscroll-contain bg-[#030207]/96 backdrop-blur-xl lg:hidden"
        >
          <nav
            id="mobile-navigation"
            className="content-shell flex h-full flex-col justify-center pb-[max(2rem,env(safe-area-inset-bottom))]"
            aria-label="Mobile navigation"
          >
            <p className="utility-text mb-8 text-xs text-violet-300">
              Choose your path
            </p>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex min-h-16 items-center border-t border-white/10 py-3 last:border-b"
              >
                <span className="utility-text mr-5 text-[0.65rem] text-zinc-600">
                  0{index + 1}
                </span>
                <span className="display-text text-[clamp(2.4rem,12vw,4.2rem)] font-bold uppercase leading-none tracking-[-0.03em] text-zinc-200 transition-colors duration-200 group-hover:text-violet-300">
                  {item.label}
                </span>
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex min-h-11 items-center text-base text-zinc-300"
              onClick={() => setOpen(false)}
            >
              Support
            </Link>
            <div className="mt-6">
              <DownloadAction
                placement="mobile_menu"
                onClick={() => setOpen(false)}
              />
            </div>
            <p className="mt-3 text-xs leading-6 text-zinc-400">
              7-day trial for eligible new subscribers on eligible plans.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
