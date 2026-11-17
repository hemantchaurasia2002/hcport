"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { splitLines } from "@/animations/textAnimations";
import { useReducedMotion } from "./useReducedMotion";

export function useTextReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const targets = scope.current.querySelectorAll<HTMLElement>("[data-split]");
      const cleanups: Array<() => void> = [];
      let alive = true;

      targets.forEach((target) => {
        void splitLines(target).then((cleanup) => {
          if (!alive) cleanup();
          else cleanups.push(cleanup);
        });
      });

      return () => {
        alive = false;
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope, dependencies: [reduced] },
  );

  return scope;
}
