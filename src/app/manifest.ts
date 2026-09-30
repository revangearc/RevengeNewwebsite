import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Revenge Arc",
    short_name: "Revenge Arc",
    description: "Train. Fuel. Adapt. Connect. Prove.",
    start_url: "/",
    display: "standalone",
    background_color: "#030207",
    theme_color: "#030207",
    icons: [{ src: "/assets/brand/ra-logo-3d.png", sizes: "512x512", type: "image/png" }],
  };
}
