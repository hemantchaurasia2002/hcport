"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { revealVars } from "@/animations/animationPresets";
import { scrollStart } from "@/animations/animationConfig";
import { useReducedMotion } from "./useReducedMotion";

export function useScrollAnimation<T extends HTMLElement>() {
  const scope = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const nodes = scope.current.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!nodes.length) return;

      const triggers = ScrollTrigger.batch(nodes, {
        start: scrollStart,
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { ...revealVars, autoAlpha: 1, y: 0, overwrite: "auto" });
        },
      });

      const safety = window.setTimeout(() => {
        nodes.forEach((node) => {
          const inView = node.getBoundingClientRect().top < window.innerHeight * 0.92;
          if (inView && getComputedStyle(node).opacity === "0") {
            node.style.opacity = "1";
            node.style.transform = "none";
          }
        });
      }, 1600);

      return () => {
        window.clearTimeout(safety);
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope, dependencies: [reduced], revertOnUpdate: true },
  );

  return scope;
}
