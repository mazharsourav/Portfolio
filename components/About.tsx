import Image from "next/image";
import { GraduationCap, Briefcase, Download, ArrowDown, User } from "lucide-react";
import { profile, education, experience } from "@/lib/data";
import { cardHover, buttonHover } from "@/lib/styles";
import Reveal from "@/components/Reveal";

const badgeSkills = ["React", "Node", "UI/UX", "Full Stack"];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-20 xl:py-24">
      <Reveal>
        <h2 className="text-3xl font-bold text-foreground">About Me</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          <Reveal delay={0.05}>
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <User size={16} />
                Bio
              </div>
              <p className="mt-2 text-justify leading-relaxed text-muted">{profile.bio}</p>
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal delay={0.1}>
              <div className={`h-full rounded-2xl border border-border bg-surface p-6 shadow-sm ${cardHover}`}>
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <GraduationCap size={16} />
                  Education
                </div>
                <div className="mt-3 space-y-3">
                  {education.map((ed) => (
                    <div key={ed.degree}>
                      <p className="font-semibold text-foreground">{ed.degree}</p>
                      <ul className="mt-1 list-disc space-y-2 pl-4 marker:text-accent">
                        <li className="text-sm text-muted">{ed.institution}</li>
                        <li className="text-xs text-muted">
                          {ed.period} {ed.note && `· ${ed.note}`}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className={`h-full rounded-2xl border border-border bg-surface p-6 shadow-sm ${cardHover}`}>
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Briefcase size={16} />
                  Experience
                </div>
                <div className="mt-3 space-y-3">
                  {experience.map((ex) => (
                    <div key={ex.role + ex.company}>
                      <p className="font-semibold text-foreground">{ex.role}</p>
                      <ul className="mt-1 list-disc space-y-2 pl-4 marker:text-accent">
                        <li className="text-sm text-muted">{ex.company}</li>
                        <li className="text-xs text-muted">{ex.period}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col items-center justify-between text-center lg:items-start lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative transition-transform duration-300 hover:scale-105">
                <div className="h-40 w-40 overflow-hidden rounded-full ring-4 ring-accent ring-offset-4 ring-offset-background">
                  <Image
                    src="/main-image.jpg"
                    alt={`${profile.firstName} ${profile.lastName}`}
                    width={160}
                    height={160}
                    className="h-full w-full scale-125 object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-white shadow">
                  {profile.gpaBadge}
                </span>
              </div>
              <p className="mt-6 text-lg font-bold text-foreground">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="mt-1 whitespace-pre-line text-sm text-muted">{profile.role}</p>

              <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {badgeSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={profile.resumeUrl}
              download
              className={`group mt-6 mb-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark ${buttonHover}`}
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
              Download Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
