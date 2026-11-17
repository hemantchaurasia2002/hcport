"use client";

import { gsap } from "@/lib/gsap";
import { lineVars } from "./animationPresets";

type SplitLike = {
  lines: HTMLElement[] | null;
  revert: () => void;
};

export async function splitLines(element: HTMLElement) {
  const { default: SplitType } = await import("split-type");
  const split = new SplitType(element, { types: "lines", lineClass: "split-line" }) as SplitLike;
  const inners: HTMLElement[] = [];

  split.lines?.forEach((line) => {
    const inner = document.createElement("span");
    inner.className = "split-inner";
    inner.style.display = "block";
    while (line.firstChild) inner.appendChild(line.firstChild);
    line.appendChild(inner);
    inners.push(inner);
  });

  const tween = gsap.from(inners, lineVars);

  return () => {
    tween.kill();
    split.revert();
  };
}
