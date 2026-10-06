"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Award, Move, ExternalLink } from "lucide-react";
import { achievements } from "@/lib/data";
import { cardHover, buttonHover } from "@/lib/styles";
import Reveal from "@/components/Reveal";

export default function Achievements() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const scrollByCards = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active || !trackRef.current) return;
    const delta = e.clientX - drag.current.startX;
    trackRef.current.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section id="achievements" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-20 xl:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Achievements</h2>
            <p className="mt-2 max-w-2xl text-muted">
              A collection of my professional accomplishments, awards, and
              certifications earned throughout my journey.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs font-medium text-muted sm:flex">
              <Move size={14} />
              Drag to explore
            </span>
            <button
              onClick={() => scrollByCards(-1)}
              aria-label="Scroll left"
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground hover:border-accent hover:text-accent ${buttonHover}`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              aria-label="Scroll right"
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground hover:border-accent hover:text-accent ${buttonHover}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Reveal>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar mt-8 flex cursor-grab gap-5 overflow-x-auto scroll-smooth pt-2 pb-2 active:cursor-grabbing"
      >
        {achievements.map((a) => (
          <div
            key={a.title}
            className={`flex w-[270px] shrink-0 select-none flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm ${cardHover}`}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Award size={16} />
              </span>
              <span className="text-xs font-semibold text-muted">{a.year}</span>
            </div>
            <h3 className="mt-4 font-semibold leading-snug text-foreground">
              {a.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {a.description}
            </p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="inline-block w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                {a.tag}
              </span>
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View certificate for ${a.title}`}
                  className="group flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
                >
                  <ExternalLink
                    size={13}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
