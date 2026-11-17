"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setScrollApi } from "@/animations/scrollManager";
import { reducedMotion } from "@/animations/transitionManager";

type ScrollContextValue = {
  scrollTo: (target: string | HTMLElement) => void;
  stop: () => void;
  start: () => void;
};

import { createContext, useContext, useMemo, type ReactNode } from "react";

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useSiteScroll() {
  const value = useContext(ScrollContext);
  if (!value) throw new Error("useSiteScroll must be used inside SmoothScroll");
  return value;
}

function nativeScroll(target: string | HTMLElement) {
  const node = typeof target === "string" ? document.querySelector(target) : target;
  node?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const api = useMemo<ScrollContextValue>(
    () => ({
      scrollTo: (target) => {
        if (lenisRef.current) {
          lenisRef.current.start();
          lenisRef.current.scrollTo(target, { offset: -72 });
        } else nativeScroll(target);
      },
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  );

  useEffect(() => {
    setScrollApi(api);
    if (reducedMotion()) {
      if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
      return;
    }

    const lenis = new Lenis({ autoRaf: false, duration: 1.05, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const hashTimer = window.setTimeout(() => {
      if (window.location.hash) lenis.scrollTo(window.location.hash, { offset: -72, immediate: false });
    }, 120);

    return () => {
      window.clearTimeout(hashTimer);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [api]);

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
