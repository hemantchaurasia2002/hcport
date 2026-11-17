"use client";

export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function transitionTo(url: string) {
  window.location.assign(url);
}
