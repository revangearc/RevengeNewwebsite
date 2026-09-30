"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLightMotion } from "@/hooks/use-light-motion";

export function SiteMotion() {
  const pathname = usePathname();
  const allowed = useLightMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.lightMotion = allowed ? "on" : "off";
    const buddies = document.querySelectorAll<HTMLElement>("[data-buddy-motion]");
    const visibleBuddies = new Set<HTMLElement>();
    function updateVisibility() {
      root.dataset.pageVisible = String(!document.hidden);
      buddies.forEach((buddy) => {
        buddy.dataset.motionActive = String(
          allowed && !document.hidden && visibleBuddies.has(buddy),
        );
      });
    }
    updateVisibility();
    if (!allowed || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const element = target as HTMLElement;
          if (element.hasAttribute("data-buddy-motion")) {
            if (isIntersecting) visibleBuddies.add(element);
            else visibleBuddies.delete(element);
          }
          if (isIntersecting && element.hasAttribute("data-reveal")) {
            element.dataset.revealed = "true";
            if (!element.hasAttribute("data-buddy-motion"))
              observer.unobserve(element);
          }
        });
        updateVisibility();
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal], [data-buddy-motion]")
      .forEach((element) => observer.observe(element));
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      buddies.forEach((buddy) => { buddy.dataset.motionActive = "false"; });
    };
  }, [allowed, pathname]);

  return null;
}
