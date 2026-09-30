"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/client-events";

export function AnalyticsObserver() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPath.current === pathname || pathname.startsWith("/admin")) return;
    lastPath.current = pathname;
    trackEvent("page_view");
  }, [pathname]);

  return null;
}
