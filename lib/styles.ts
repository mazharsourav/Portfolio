export const cardHover =
  "transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10";

export const buttonHover = "transition-all duration-200 hover:scale-[1.03] active:scale-95";

// Same-page anchors (#about) and mailto: links should stay in the current tab;
// everything else (external sites, resume PDFs) opens in a new tab.
export function externalLinkProps(href: string) {
  if (href.startsWith("#") || href.startsWith("mailto:")) return {};
  return { target: "_blank" as const, rel: "noopener noreferrer" };
}
