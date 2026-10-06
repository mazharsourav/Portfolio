import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

// Static export (GitHub Pages) needs this generated once at build time
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
