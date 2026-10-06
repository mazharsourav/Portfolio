import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

// Static export (GitHub Pages) needs this generated once at build time
export const dynamic = "force-static";

// Single-page site, so the sitemap is just the homepage. Generated at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
