"use client";

import { gsap } from "@/lib/gsap";

export function masterTimeline() {
  return gsap.timeline({ defaults: { ease: "power3.out" } });
}
