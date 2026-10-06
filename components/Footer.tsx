import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile, socials, navLinks, contact } from "@/lib/data";
import { buttonHover, externalLinkProps } from "@/lib/styles";

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 py-6 sm:px-8 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <a href="#home" className="text-lg font-bold text-foreground" aria-label="Back to top">
            {profile.initials.slice(0, 1)}
            <span className="text-accent">{profile.initials.slice(1)}</span>.
          </a>
          <span className="border-l border-border pl-3 font-mono text-xs text-muted">
            {profile.title}
          </span>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          {socials.map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...externalLinkProps(s.href)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent ${buttonHover}`}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Editor-style status bar, echoing the code windows in the hero and contact form */}
      <div className="bg-accent font-mono text-xs text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-1.5 px-5 py-2 sm:px-8">
          {contact.availability ? (
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              {contact.availability}
            </span>
          ) : (
            <span />
          )}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="opacity-85" />
              {contact.location}
            </span>
            <span>
              © {year} {profile.firstName} {profile.lastName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
