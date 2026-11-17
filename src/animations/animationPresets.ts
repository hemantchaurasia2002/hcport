import { durations, eases, staggers } from "./animationConfig";

export const revealVars = {
  y: 22,
  autoAlpha: 0,
  duration: durations.reveal,
  ease: eases.out,
  stagger: staggers.base,
} as const;

export const lineVars = {
  yPercent: 110,
  duration: durations.reveal,
  ease: eases.out,
  stagger: staggers.tight,
} as const;
