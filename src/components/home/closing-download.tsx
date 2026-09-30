"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { APP_STORE_URL } from "@/content/site";
import { trackEvent } from "@/lib/client-events";

export function ClosingDownload() {
  const content = <>Download for iPhone <ArrowUpRight size={20} aria-hidden="true" /></>;
  return APP_STORE_URL
    ? <a className="closing-download" href={APP_STORE_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("app_store_click", { placement: "closing" })}>{content}</a>
    : <button type="button" className="closing-download" disabled title="The App Store link will be added when the app is approved.">{content}</button>;
}
