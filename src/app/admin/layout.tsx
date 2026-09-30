import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Revenge Arc Admin" },
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main id="main-content" className="min-h-svh bg-[#040309]">{children}</main>;
}
