import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Revenge Arc — Stop Starting Over", template: "%s | Revenge Arc" },
  description: "Your workouts, meals, and progress in one app. Meet GymBuddy and explore Revenge Arc for iPhone, with a 7-day trial for eligible new subscribers.",
  applicationName: "Revenge Arc",
  keywords: ["fitness", "workout tracker", "nutrition", "AI coach", "gym community"],
  openGraph: {
    type: "website",
    title: "Revenge Arc — Stop Starting Over",
    description: "Your workouts. Your meals. Your momentum. Explore Revenge Arc for iPhone.",
    siteName: "Revenge Arc",
    images: [{ url: "/assets/scenes/hero-landscape-1280.webp", width: 1280, height: 720, alt: "Revenge Arc" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revenge Arc — Stop Starting Over",
    description: "Your workouts, meals, and progress. One app. Your arc.",
    images: ["/assets/scenes/hero-landscape-1280.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030207",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <noscript><style>{`.motion-static-fallback{opacity:1!important;transform:none!important}`}</style></noscript>
      </body>
    </html>
  );
}
