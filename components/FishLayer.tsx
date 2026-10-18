"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ENABLE_FISH_ANIMATION } from "@/lib/site";

// Fish that swim diagonally across the page as it scrolls. The toggle lives in
// lib/site.ts.
export default function FishLayer() {
  return ENABLE_FISH_ANIMATION ? <Fish /> : null;
}

function Fish() {
  const swimRef = useRef<HTMLDivElement | null>(null);

  // Expose page scroll progress (0 → 1) as --swim-p; the diagonal travel
  // itself is computed in CSS (.swim).
  useEffect(() => {
    const el = swimRef.current;
    if (!el) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--swim-p", p.toFixed(4));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="swim" ref={swimRef} aria-hidden="true">
      <Image className="swim__fish swim__fish--1" src="/swim_fish_a.png" alt="" width={375} height={259} sizes="20vw" />
      <Image className="swim__fish swim__fish--2" src="/swim_fish_b.png" alt="" width={289} height={217} sizes="15vw" />
      <Image className="swim__fish swim__fish--3" src="/swim_fish_a.png" alt="" width={375} height={259} sizes="12vw" />
      <Image className="swim__fish swim__fish--4" src="/swim_fish_b.png" alt="" width={289} height={217} sizes="10vw" />
    </div>
  );
}
