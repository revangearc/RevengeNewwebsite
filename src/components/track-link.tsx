"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import type { PublicEventName } from "@/lib/client-events";
import { trackEvent } from "@/lib/client-events";

export function TrackLink({ event, details, ...props }: ComponentProps<typeof Link> & { event: PublicEventName; details?: Record<string, string | number | boolean | null> }) {
  return <Link {...props} onClick={() => trackEvent(event, details)} />;
}
