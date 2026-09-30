"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { APP_STORE_URL } from "@/content/site";
import { trackEvent } from "@/lib/client-events";

export function DownloadAction({
  placement,
  className = "",
  onClick,
}: {
  placement: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={APP_STORE_URL || "/#app-launch"}
      target={APP_STORE_URL ? "_blank" : undefined}
      rel={APP_STORE_URL ? "noreferrer" : undefined}
      onClick={() => {
        if (APP_STORE_URL) trackEvent("app_store_click", { placement });
        onClick?.();
      }}
      className={`download-action ${className}`}
    >
      {APP_STORE_URL
        ? "Get Revenge Arc for iPhone"
        : "See iPhone launch details"}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}
