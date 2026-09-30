export function absoluteUrl(path = "/") {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
