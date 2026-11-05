import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

// Static export (GitHub Pages) needs this generated once at build time
export const dynamic = "force-static";

// Named so the choice is explicit: this site wants to be found through AI answers as well as search.
// Covers both the bots that index for answers and the ones that fetch a page when a user asks.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
