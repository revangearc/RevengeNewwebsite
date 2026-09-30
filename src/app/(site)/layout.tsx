import { AnalyticsObserver } from "@/components/analytics-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DownloadBar } from "@/components/download-bar";
import { APP_STORE_URL } from "@/content/site";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main
        id="main-content"
        className={APP_STORE_URL ? "has-download-bar" : undefined}
      >
        {children}
      </main>
      <SiteFooter />
      <DownloadBar />
      <AnalyticsObserver />
    </>
  );
}
