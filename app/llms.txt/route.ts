import { achievements, contact, education, experience, profile, projects, site, skillCategories, socials } from "@/lib/data";

// Static export (GitHub Pages) needs this generated once at build time
export const dynamic = "force-static";

// Plain-text profile for AI tools (llmstxt.org). Built from lib/data.ts, so it stays in step with the site.
// The phone number is left out on purpose: email and the links below are enough here.
export function GET() {
  const projectLines = projects.map((p) => {
    const links = [
      `[Source code](${p.github})`,
      ...(p.live !== "#" ? [`[Live demo](${p.live})`] : []),
      ...(p.download ? [`[Download APK](${p.download})`] : []),
    ];
    return `- **${p.title}**: ${p.description} Tags: ${p.tags.join(", ")}. ${links.join(" | ")}`;
  });

  const body = [
    `# ${profile.fullName} (${profile.firstName} ${profile.lastName})`,
    "",
    `> ${site.description}`,
    "",
    profile.bio,
    "",
    `Location: ${contact.location}. ${contact.availability}.`,
    "",
    "## Projects",
    "",
    ...projectLines,
    "",
    "## Skills",
    "",
    ...skillCategories.map((c) => `- ${c.title}: ${c.tags.join(", ")}`),
    "",
    "## Experience",
    "",
    ...experience.map((e) => `- ${e.role}, ${e.company} (${e.period})`),
    "",
    "## Education",
    "",
    ...education.map((e) => `- ${e.degree}, ${e.institution} (${e.period}). ${e.note}`),
    "",
    "## Awards and certifications",
    "",
    ...achievements.map((a) => `- ${a.title}: ${a.description}`),
    "",
    "## Links",
    "",
    `- [Portfolio](${site.url})`,
    `- [Resume (PDF)](${site.url}${profile.resumeUrl})`,
    ...socials.filter((s) => s.href.startsWith("http")).map((s) => `- [${s.label}](${s.href})`),
    `- Email: ${contact.email}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
