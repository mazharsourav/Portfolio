"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { buttonHover } from "@/lib/styles";

const THEME_EVENT = "themechange";

// Lets us render a client-only placeholder without ever calling setState
// in an effect (avoids a hydration mismatch since the server doesn't know
// which theme the user has picked).
function subscribeMounted() {
  return () => {};
}
const getMountedSnapshot = () => true;
const getMountedServerSnapshot = () => false;

function subscribeTheme(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}
const getThemeSnapshot = () => document.documentElement.classList.contains("dark");
const getThemeServerSnapshot = () => false;

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getMountedServerSnapshot);
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  if (!mounted) {
    return <div aria-hidden className={`h-9 w-9 ${className}`} />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent ${buttonHover} ${className}`}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
