import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";

// Static export (GitHub Pages) needs this generated once at build time
export const dynamic = "force-static";

// Single-page site, so the sitemap is just the homepage, plus its project images
// so they can show up in image search. Generated at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${site.url}/main-image.jpg`,
        ...projects.flatMap((p) => (p.image ? [`${site.url}${p.image}`] : [])),
      ],
    },
  ];
}
