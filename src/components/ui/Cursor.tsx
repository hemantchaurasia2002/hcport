"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("has-cursor");
    const onMove = (event: PointerEvent) => {
      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;
      if (dot.current) dot.current.style.transform = `translate3d(${x}, ${y}, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${x}, ${y}, 0)`;
      const target = event.target instanceof Element ? event.target : null;
      ring.current?.setAttribute("data-active", target?.closest("a, button") ? "true" : "false");
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
