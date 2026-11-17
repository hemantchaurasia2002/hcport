"use client";

import { useEffect, useRef } from "react";

export function StructureField({ motion }: { motion: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    const columns = 42;
    const rows = 42;

    const draw = (time: number) => {
      const box = canvas.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, box.width);
      const height = Math.max(1, box.height);
      const pixelWidth = Math.floor(width * density);
      const pixelHeight = Math.floor(height * density);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      context.setTransform(density, 0, 0, density, 0, 0);
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(width * 0.5, height * 0.58, 8, width * 0.5, height * 0.58, width * 0.48);
      glow.addColorStop(0, "rgba(196, 122, 48, 0.34)");
      glow.addColorStop(0.45, "rgba(120, 70, 24, 0.08)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const t = time * 0.001;
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const u = x / (columns - 1) - 0.5;
          const v = y / (rows - 1) - 0.5;
          const distance = Math.hypot(u, v);
          const pull = Math.exp(-distance * distance * 7);
          const angle = Math.atan2(v, u) + t * 0.4;
          const wave = Math.sin(u * 10 + t * 1.5) * 0.034 + Math.sin(v * 8 - t * 0.9) * 0.026;
          const px = u * (1 - pull * 0.62) + Math.cos(angle) * pull * 0.14;
          const py = v * (1 - pull * 0.35) + wave * (1 - pull * 0.8) + Math.sin(angle) * pull * 0.14;
          const sx = width * 0.5 + px * width * 0.92;
          const sy = height * 0.5 + py * height * 0.92;
          const alpha = 0.22 + (1 - Math.min(distance * 1.35, 1)) * 0.78;
          context.fillStyle = `rgba(232, 198, 142, ${alpha})`;
          context.beginPath();
          context.arc(sx, sy, 1.05 + (1 - distance) * 0.85, 0, Math.PI * 2);
          context.fill();
        }
      }
      if (motion) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [motion]);

  return <canvas ref={ref} className="structure" aria-hidden="true" />;
}
