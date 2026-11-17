"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, ShaderMaterial, BufferGeometry, Float32BufferAttribute, type Points } from "three";
import { photos } from "@/data/profile";

const vertexShader = `
attribute vec3 aColor;
attribute float aSeed;
uniform float uTime;
uniform float uProgress;
uniform float uScale;
uniform float uDpr;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float p = smoothstep(0.02, 0.8, uProgress);
  vec3 target = vec3((aSeed - 0.5) * 2.5, sin(aSeed * 25.1327) * 0.055 + (floor(position.x * 4.0 + 2.0) - 2.0) * 0.18, sin(aSeed * 18.0) * 0.1);
  vec3 pos = mix(position, target, p);
  float edge = smoothstep(0.18, 0.5, abs(position.x));
  pos.x += sin(uTime * 0.3 + aSeed * 40.0) * 0.008 * (edge + p);
  pos.z += sin(aSeed * 64.0 + uTime * 0.2) * 0.015;
  vec4 mv = modelViewMatrix * vec4(pos * uScale, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.15 + dot(aColor, vec3(0.299, 0.587, 0.114)) * 0.9) * uDpr;
  vColor = mix(aColor, vec3(1.0, 0.44, 0.18), p * 0.55);
  vAlpha = (1.0 - p * 0.35) * smoothstep(0.5, 0.36, abs(position.y));
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.27, d) * vAlpha;
  if (alpha < 0.025) discard;
  gl_FragColor = vec4(vColor * 1.25, alpha);
}
`;

function paintPortrait(image: HTMLImageElement, canvas: HTMLCanvasElement) {
  const width = canvas.width;
  const height = canvas.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  const targetAspect = width / height;
  const sourceAspect = image.width / image.height;
  let sourceWidth: number;
  let sourceHeight: number;
  let sourceX: number;
  let sourceY: number;
  if (sourceAspect > targetAspect) {
    sourceHeight = image.height;
    sourceWidth = sourceHeight * targetAspect;
    sourceX = (image.width - sourceWidth) / 2;
    sourceY = 0;
  } else {
    sourceWidth = image.width;
    sourceHeight = sourceWidth / targetAspect;
    sourceX = 0;
    sourceY = (image.height - sourceHeight) * 0.08;
  }
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
  const frame = context.getImageData(0, 0, width, height);
  const pixels = frame.data;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
      const graded = Math.min(1, Math.pow(Math.max(luminance, 0.001), 0.9) * 1.08);
      const warmth = x / width;
      pixels[index] = Math.min(255, graded * 255 * (0.86 + warmth * 0.34));
      pixels[index + 1] = graded * 255 * 0.88;
      pixels[index + 2] = graded * 255 * 0.68;
      pixels[index + 3] = 255;
    }
  }
  context.putImageData(frame, 0, 0);
  return frame;
}

function buildGeometry(frame: ImageData) {
  const { width, height, data } = frame;
  const positions: number[] = [];
  const colors: number[] = [];
  const seeds: number[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const luminance = (0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2]) / 255;
      if (luminance < 0.035) continue;
      positions.push((x / width - 0.5) * 0.8, 0.5 - y / height, 0.025 * luminance);
      colors.push(data[index] / 255, data[index + 1] / 255, data[index + 2] / 255);
      seeds.push(((127 * x + 311 * y) % 997) / 997);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aColor", new Float32BufferAttribute(colors, 3));
  geometry.setAttribute("aSeed", new Float32BufferAttribute(seeds, 1));
  return geometry;
}

function ParticlePortrait({
  geometry,
  fallbackRef,
  progressRef,
  pointerRef,
}: {
  geometry: BufferGeometry;
  fallbackRef: RefObject<HTMLDivElement | null>;
  progressRef: RefObject<number>;
  pointerRef: RefObject<number>;
}) {
  const points = useRef<Points>(null);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        toneMapped: false,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uScale: { value: 1 },
          uDpr: { value: 1 },
        },
      }),
    [],
  );
  const { viewport, size, gl } = useThree();

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const box = fallbackRef.current?.getBoundingClientRect();
    const backdrop = fallbackRef.current?.closest(".scene-backdrop")?.getBoundingClientRect();
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uProgress.value = MathUtils.damp(material.uniforms.uProgress.value, progressRef.current, 3, delta);
    material.uniforms.uDpr.value = gl.getPixelRatio();
    if (!box || !points.current) return;
    const top = box.top - (backdrop?.top ?? 0);
    material.uniforms.uScale.value = (box.height * viewport.height) / size.height;
    points.current.position.y = viewport.height / 2 - ((top + box.height / 2) * viewport.height) / size.height;
    points.current.rotation.y = MathUtils.damp(points.current.rotation.y, 0.015 * pointerRef.current, 3, delta);
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

export function PortraitField({ motion }: { motion: boolean }) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const pointerRef = useRef(0);
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    const image = new Image();
    let cancelled = false;
    image.onload = () => {
      if (cancelled) return;
      const plate = plateRef.current;
      if (plate) {
        plate.width = 800;
        plate.height = 1000;
        paintPortrait(image, plate);
      }
      const sample = document.createElement("canvas");
      sample.width = window.innerWidth < 700 ? 180 : 300;
      sample.height = Math.round(sample.width * 1.25);
      const frame = paintPortrait(image, sample);
      if (frame) setGeometry(buildGeometry(frame));
    };
    image.src = photos.formal.src;
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      progressRef.current = Math.min(1, window.scrollY / (window.innerHeight * 0.85));
    };
    const onPointer = (event: PointerEvent) => {
      pointerRef.current = (event.clientX / window.innerWidth) * 2 - 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  useEffect(() => () => geometry?.dispose(), [geometry]);

  return (
    <div className="scene-backdrop" aria-hidden="true">
      <div ref={fallbackRef} className={`artifact-fallback${webgl && geometry && motion ? " webgl-active" : ""}`}>
        <canvas ref={plateRef} />
      </div>
      {geometry && motion && webgl ? (
        <Canvas
          className="webgl-layer"
          camera={{ position: [0, 0, 6], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: "low-power" }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", () => setWebgl(false), { once: true });
          }}
        >
          <ParticlePortrait geometry={geometry} fallbackRef={fallbackRef} progressRef={progressRef} pointerRef={pointerRef} />
        </Canvas>
      ) : null}
    </div>
  );
}
