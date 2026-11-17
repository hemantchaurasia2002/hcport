"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function subscribeDense(onChange: () => void) {
  const query = window.matchMedia("(min-width: 1024px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function GlassScene({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const webgl = useSyncExternalStore(subscribeDense, supportsWebGL, () => false);
  const dense = useSyncExternalStore(
    subscribeDense,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );

  if (!webgl) {
    return <div className="glass-fallback" aria-hidden="true" />;
  }

  return <HeroCanvas moving={active && !reduced} dense={dense && !reduced} />;
}
