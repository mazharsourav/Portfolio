"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, ChevronDown, ChevronUp, FolderGit2 } from "lucide-react";
import { projects } from "@/lib/data";
import { cardHover, buttonHover } from "@/lib/styles";
import Reveal from "@/components/Reveal";

const INITIAL_COUNT = 6;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-20 xl:py-24">
      <Reveal>
        <h2 className="text-3xl font-bold text-foreground">Projects</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Here are some of the projects I&apos;ve worked on, showcasing my skills
          in various technologies and problem domains.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.title} delay={Math.min(i * 0.07, 0.3)}>
            <div
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${cardHover}`}
            >
              {project.image ? (
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-accent to-accent-dark">
                  <FolderGit2
                    className="text-white/80 transition-transform duration-300 group-hover:scale-110"
                    size={40}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <p className="mt-2 flex-1 text-justify hyphens-auto text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                  {project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-foreground shadow-sm hover:border-accent hover:text-accent ${buttonHover}`}
          >
            {showAll ? "Show Less" : "Show More Projects"}
            {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}
    </section>
  );
}
