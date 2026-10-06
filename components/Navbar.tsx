"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Download, ArrowDown } from "lucide-react";
import { profile, navLinks as links } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const setHeight = () =>
      document.documentElement.style.setProperty(
        "--nav-h",
        `${header.offsetHeight}px`
      );
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", "#home");
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <a
          href="#home"
          onClick={handleHomeClick}
          className="text-[28px] font-extrabold tracking-tight text-foreground"
        >
          {profile.initials.slice(0, 1)}
          <span className="text-accent">{profile.initials.slice(1)}</span>.
        </a>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={link.href === "#home" ? handleHomeClick : undefined}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    active === link.href.slice(1)
                      ? "text-accent"
                      : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <a
              href={profile.resumeUrl}
              download
              className="group hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.015] hover:bg-accent-dark active:scale-95 md:inline-flex"
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <Download
                  size={15}
                  className="absolute transition-all duration-200 group-hover:scale-0 group-hover:opacity-0"
                />
                <ArrowDown
                  size={18}
                  className="absolute scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                />
              </span>
              Resume
            </a>

            <button
              className="cursor-pointer text-foreground md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-5 md:hidden">
          <ul className="flex flex-col gap-1 pt-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "#home") handleHomeClick(e);
                    setOpen(false);
                  }}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                    active === link.href.slice(1)
                      ? "bg-accent-soft text-accent"
                      : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resumeUrl}
            download
            className="group mt-3 flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.015] hover:bg-accent-dark active:scale-95"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <Download
                size={15}
                className="absolute transition-all duration-200 group-hover:scale-0 group-hover:opacity-0"
              />
              <ArrowDown
                size={18}
                className="absolute scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
              />
            </span>
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
