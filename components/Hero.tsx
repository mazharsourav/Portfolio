"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, X, Minus, Plus } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { buttonHover, externalLinkProps } from "@/lib/styles";

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

const CODE_TOKEN_RE =
  /(".*?"|'.*?')|(\bconst\b)|([a-zA-Z_$][\w$]*)(?=:)|([{}[\]();,=])/g;

function highlightLine(text: string) {
  const parts: { text: string; className: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  CODE_TOKEN_RE.lastIndex = 0;
  while ((match = CODE_TOKEN_RE.exec(text))) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), className: "text-slate-700 dark:text-slate-200" });
    }
    const [full, string, keyword, key, punct] = match;
    if (string) parts.push({ text: full, className: "text-emerald-600 dark:text-emerald-400" });
    else if (keyword) parts.push({ text: full, className: "text-purple-600 dark:text-purple-400" });
    else if (key) parts.push({ text: full, className: "text-sky-600 dark:text-sky-400" });
    else if (punct) parts.push({ text: full, className: "text-slate-500 dark:text-slate-400" });
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), className: "text-slate-700 dark:text-slate-200" });
  }
  return parts;
}

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100dvh-var(--nav-h,72px))] items-center"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:py-20">
        <div className="w-full flex-1 min-w-0 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-base font-semibold text-accent"
          >
            Hello! I&apos;m
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl"
          >
            {profile.firstName}{" "}
            <span className="text-accent">{profile.lastName}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-2xl font-medium text-muted sm:text-3xl"
          >
            {profile.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-5 max-w-lg text-lg text-muted lg:mx-0"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href="#contact"
              className={`rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark ${buttonHover}`}
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className={`rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-foreground hover:border-accent hover:text-accent ${buttonHover}`}
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex items-center justify-center gap-4 lg:justify-start"
          >
            {socials.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...externalLinkProps(s.href)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent ${buttonHover}`}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full flex-1 min-w-0"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ y: -14 }}
            className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-terminal-border dark:bg-terminal"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 dark:border-terminal-border">
              <div className="flex gap-1.5">
                <span className="group flex h-3 w-3 items-center justify-center rounded-full bg-red-400 transition-transform duration-200 hover:scale-125">
                  <X
                    size={8}
                    strokeWidth={3}
                    className="text-red-900 opacity-0 transition-opacity duration-200 group-hover:opacity-70"
                  />
                </span>
                <span className="group flex h-3 w-3 items-center justify-center rounded-full bg-yellow-400 transition-transform duration-200 hover:scale-125">
                  <Minus
                    size={8}
                    strokeWidth={3}
                    className="text-yellow-900 opacity-0 transition-opacity duration-200 group-hover:opacity-70"
                  />
                </span>
                <span className="group flex h-3 w-3 items-center justify-center rounded-full bg-green-400 transition-transform duration-200 hover:scale-125">
                  <Plus
                    size={8}
                    strokeWidth={3}
                    className="text-green-900 opacity-0 transition-opacity duration-200 group-hover:opacity-70"
                  />
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {profile.codeSnippet.fileLabel}
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-7 font-mono text-[13px] leading-7">
              {profile.codeSnippet.lines.map((line, i) =>
                line.type === "comment" ? (
                  <div key={i} className="text-slate-400 dark:text-slate-500">
                    {line.text}
                  </div>
                ) : (
                  <div key={i}>
                    {highlightLine(line.text).map((part, j) => (
                      <span key={j} className={part.className}>
                        {part.text}
                      </span>
                    ))}
                  </div>
                )
              )}
            </pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
