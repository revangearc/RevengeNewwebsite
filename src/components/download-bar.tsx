"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { APP_STORE_URL } from "@/content/site";
import { DownloadAction } from "./download-action";

export function DownloadBar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!APP_STORE_URL) return;
    const start = document.querySelector("[data-download-entry]");
    if (!start) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(start);
    return () => observer.disconnect();
  }, [pathname]);
  if (!APP_STORE_URL || !visible) return null;
  return (
    <aside className="mobile-download-bar" aria-label="Get Revenge Arc">
      <span>
        <strong>Start your arc.</strong>
        <small>7-day trial · eligibility applies</small>
      </span>
      <DownloadAction placement="mobile_bar" />
    </aside>
  );
}
