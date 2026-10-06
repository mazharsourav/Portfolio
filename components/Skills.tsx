import {
  Code2,
  LayoutTemplate,
  Server,
  Database,
  Wrench,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/lib/data";
import { cardHover } from "@/lib/styles";
import Reveal from "@/components/Reveal";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  wrench: Wrench,
  palette: Palette,
};

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-20 xl:py-24">
      <Reveal>
        <h2 className="text-3xl font-bold text-foreground">Skills</h2>
        <p className="mt-2 max-w-2xl text-muted">
          I&apos;ve worked with a range of technologies in the web development
          world, from frontend to backend and everything in between.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon];
          return (
            <Reveal key={cat.title} delay={Math.min(i * 0.07, 0.3)}>
              <div className={`h-full rounded-2xl border border-border bg-surface p-6 shadow-sm ${cardHover}`}>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={16} />
                  </span>
                  <h3 className="font-semibold text-foreground">{cat.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
