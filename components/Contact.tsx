"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  LoaderCircle,
  CircleAlert,
  X,
  Minus,
  Plus,
} from "lucide-react";
import { contact, socials } from "@/lib/data";
import { externalLinkProps } from "@/lib/styles";
import Reveal from "@/components/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const fields = [
  { id: "contact-name", name: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "e.g. Rahim Ahmed" },
  { id: "contact-email", name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "e.g. rahim@example.com" },
  { id: "contact-subject", name: "subject", label: "Subject", type: "text", autoComplete: "off", placeholder: "What's it about?" },
] as const;

const FIELD_COUNT = fields.length + 1; // + message

const inputClass =
  "w-full rounded-lg border border-border bg-background py-2.5 pl-3.5 pr-10 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

const trafficLights = [
  { Icon: X, dot: "bg-red-400", glyph: "text-red-900" },
  { Icon: Minus, dot: "bg-yellow-400", glyph: "text-yellow-900" },
  { Icon: Plus, dot: "bg-green-400", glyph: "text-green-900" },
];

const github = socials.find((s) => s.icon === "github");
const linkedin = socials.find((s) => s.icon === "linkedin");

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the value is still selectable text
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {copied ? <Check size={14} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={14} />}
    </button>
  );
}

function LineNumber({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`select-none text-right font-mono text-xs text-slate-400 dark:text-slate-500 ${className}`}
    >
      {n}
    </span>
  );
}

function ValidMark({ show, className = "top-1/2 -translate-y-1/2" }: { show: boolean; className?: string }) {
  return (
    <Check
      aria-hidden
      size={16}
      className={`pointer-events-none absolute right-3 text-emerald-600 transition-all duration-200 dark:text-emerald-400 ${className} ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    />
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [valid, setValid] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const filled = Object.values(valid).filter(Boolean).length;
  const allFilled = filled === FIELD_COUNT;

  const trackValidity = (e: FormEvent<HTMLFormElement>) => {
    const el = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (!el.name || el.name === "botcheck") return;
    setValid((v) => ({ ...v, [el.name]: el.value.trim() !== "" && el.checkValidity() }));
  };

  const submitOnCtrlEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", contact.web3formsKey);
    data.set("subject", `Portfolio: ${data.get("subject")}`);

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setStatus("sent");
      form.reset();
      setValid({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pt-8 pb-16 sm:px-8 sm:pt-10 sm:pb-20 lg:pt-10 lg:pb-20 xl:pt-12 xl:pb-24">
      <Reveal>
        <h2 className="text-3xl font-bold text-foreground">Get In Touch</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Whether it&apos;s a role, a freelance project, or just a question,
          here&apos;s how to reach me.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12">
        {/* Left: heading pinned to the editor's top edge, contact card pinned to its bottom edge */}
        <Reveal delay={0.05} className="flex flex-col">
          <h3 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-[44px]">
            Got an idea?
            <br />
            <span className="text-accent">Let&apos;s talk.</span>
          </h3>
          <p className="mt-3.5 mb-7 max-w-md text-muted">
            Have a question or want to work together? Send a message, or reach
            me directly using any of these.
          </p>

          <div className="mt-auto overflow-hidden rounded-xl border border-border bg-surface">
            <div className="flex items-center gap-3.5 border-b border-border px-4 py-3.5 transition-colors hover:bg-background">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Mail size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11.5px] text-muted">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="block break-all text-[15px] font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </div>
              <CopyButton value={contact.email} label="Copy email" />
            </div>

            <div className="flex items-center gap-3.5 border-b border-border px-4 py-3.5 transition-colors hover:bg-background">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Phone size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11.5px] text-muted">Phone</p>
                <p className="text-[15px] font-semibold text-foreground">{contact.phone}</p>
              </div>
              <CopyButton value={contact.phone} label="Copy phone number" />
            </div>

            <div className="flex items-center gap-3.5 border-b border-border px-4 py-3.5 transition-colors hover:bg-background">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <MapPin size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11.5px] text-muted">Location</p>
                <p className="text-[15px] font-semibold text-foreground">{contact.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-border">
              {[
                { link: github, Icon: Github },
                { link: linkedin, Icon: Linkedin },
              ].map(({ link, Icon }) =>
                link ? (
                  <a
                    key={link.label}
                    href={link.href}
                    {...externalLinkProps(link.href)}
                    className="group flex items-center justify-center gap-2 p-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-background hover:text-accent"
                  >
                    <Icon size={16} />
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </a>
                ) : null
              )}
            </div>
          </div>
        </Reveal>

        {/* Right: the form, dressed as an editor window to match the hero */}
        <Reveal delay={0.1} className="flex flex-col">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            onInput={trackValidity}
            onKeyDown={submitOnCtrlEnter}
            className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-accent/5 dark:border-terminal-border dark:bg-terminal"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 dark:border-terminal-border">
              <div className="flex gap-1.5" aria-hidden>
                {trafficLights.map(({ Icon, dot, glyph }, i) => (
                  <span
                    key={i}
                    className={`group flex h-3 w-3 items-center justify-center rounded-full ${dot} transition-transform duration-200 hover:scale-125`}
                  >
                    <Icon
                      size={8}
                      strokeWidth={3}
                      className={`${glyph} opacity-0 transition-opacity duration-200 group-hover:opacity-70`}
                    />
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Mail size={13} className="text-accent" />
                new-message
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 py-5 pr-4 sm:pr-5">
              <div className="grid grid-cols-[3ch_minmax(0,1fr)] items-center gap-x-2.5 sm:grid-cols-[4ch_92px_minmax(0,1fr)] sm:gap-x-3.5">
                <LineNumber n={1} />
                <p className="text-sm text-muted sm:col-span-2">
                  <span className="font-semibold text-foreground">Hi there!</span>{" "}
                  Fill in the fields below and I&apos;ll get back to you.
                </p>
              </div>

              {fields.map((f, i) => (
                <div
                  key={f.id}
                  className="grid grid-cols-[3ch_minmax(0,1fr)] items-center gap-x-2.5 gap-y-1.5 sm:grid-cols-[4ch_92px_minmax(0,1fr)] sm:gap-x-3.5"
                >
                  <LineNumber n={i + 2} className="row-span-2 self-start pt-0.5 sm:row-span-1 sm:self-center sm:pt-0" />
                  <label htmlFor={f.id} className="font-mono text-[13px] font-medium text-sky-600 dark:text-sky-400">
                    {f.label}
                  </label>
                  <div className="relative min-w-0">
                    <input
                      id={f.id}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      required
                      className={inputClass}
                    />
                    <ValidMark show={!!valid[f.name]} />
                  </div>
                </div>
              ))}

              <div className="grid flex-1 grid-cols-[3ch_minmax(0,1fr)] grid-rows-[auto_1fr] gap-x-2.5 gap-y-1.5 sm:grid-cols-[4ch_92px_minmax(0,1fr)] sm:grid-rows-1 sm:gap-x-3.5">
                <LineNumber n={fields.length + 2} className="row-span-2 pt-0.5 sm:row-span-1 sm:pt-2.75" />
                <label htmlFor="contact-message" className="font-mono text-[13px] font-medium text-sky-600 sm:pt-2.25 dark:text-sky-400">
                  Message
                </label>
                <div className="relative min-w-0">
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    className={`${inputClass} h-full min-h-24 resize-none`}
                  />
                  <ValidMark show={!!valid.message} className="top-3" />
                </div>
              </div>
            </div>

            {/* Honeypot: hidden from people, bots that tick it get rejected by Web3Forms */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 dark:border-terminal-border">
              <div aria-live="polite" className="text-[13px]">
                {status === "sent" ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Check size={14} /> Thanks! I&apos;ll get back to you soon.
                  </span>
                ) : status === "error" ? (
                  <span className="flex items-center gap-1.5 text-red-500">
                    <CircleAlert size={14} className="shrink-0" />
                    Something went wrong. Please email me at {contact.email}.
                  </span>
                ) : (
                  <span className={`flex items-center gap-2 tabular-nums ${allFilled ? "text-foreground" : "text-muted"}`}>
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${
                        allFilled ? "bg-emerald-500" : "bg-border"
                      }`}
                    />
                    {allFilled ? "All set, ready to send" : `${filled} of ${FIELD_COUNT} filled`}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-muted sm:inline">
                  <kbd className="rounded border border-b-2 border-border bg-background px-1.5 font-mono text-[11px] text-foreground">Ctrl</kbd>
                  {" + "}
                  <kbd className="rounded border border-b-2 border-border bg-background px-1.5 font-mono text-[11px] text-foreground">Enter</kbd>
                </span>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-accent-dark disabled:cursor-wait disabled:opacity-80"
                >
                  {status === "sending" ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" /> Sending...
                    </>
                  ) : status === "sent" ? (
                    <>
                      <Check size={16} /> Message Sent
                    </>
                  ) : (
                    <>
                      <Send
                        size={15}
                        className="transition-transform duration-500 ease-out group-hover:rotate-45"
                      />{" "}
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
