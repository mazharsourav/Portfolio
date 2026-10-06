"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { buttonHover } from "@/lib/styles";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accent-dark ${buttonHover}`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
