import type { Metadata } from "next";
import { MobileHome } from "@/components/home/mobile-home";
import { ScreenGalleryProvider } from "@/components/screen-gallery";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <ScreenGalleryProvider>
      <MobileHome />
    </ScreenGalleryProvider>
  );
}
