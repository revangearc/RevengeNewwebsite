"use client";

import Image from "next/image";
import { APP_STORE_URL } from "@/content/site";
import { trackEvent } from "@/lib/client-events";

export function StoreBadges() {
  const appleBadge = (
    <Image
      src="/assets/badges/app-store.svg"
      alt="Download on the App Store"
      width={156}
      height={52}
      unoptimized
      className="app-store-badge"
    />
  );
  return (
    <div className="store-availability">
      {APP_STORE_URL ? (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("app_store_click", { placement: "hero" })}
          className="block w-fit rounded-lg"
          aria-label="Download Revenge Arc on the App Store"
        >
          {appleBadge}
        </a>
      ) : (
        <span className="launch-status">
          <span aria-hidden="true" className="launch-dot" />
          App Store link coming soon
        </span>
      )}
    </div>
  );
}
