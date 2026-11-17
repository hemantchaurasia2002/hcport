"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  out vec3 vNormal;
  out vec3 vWorld;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorld = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  in vec3 vNormal;
  in vec3 vWorld;
  out vec4 fragColor;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 2.35);
    float band = sin(vWorld.y * 2.6 + uTime * 0.45) * 0.5 + 0.5;
    vec3 blue = vec3(0.278, 0.490, 1.0);
    vec3 red = vec3(1.0, 0.294, 0.208);
    vec3 color = mix(vec3(0.035, 0.04, 0.06), blue, fresnel);
    color = mix(color, red, fresnel * band * 0.5);
    float alpha = clamp(0.08 + fresnel * 0.88, 0.0, 0.92);
    fragColor = vec4(color, alpha);
  }
`;

function Orb({ moving }: { moving: boolean }) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state, delta) => {
    if (!moving) return;
    const time = state.clock.elapsedTime;
    if (material.current) material.current.uniforms.uTime.value = time;
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.position.y = Math.sin(time * 0.7) * 0.08;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.25,
        0.05,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        state.pointer.x * -0.15,
        0.05,
      );
    }
  });

  return (
    <group ref={group}>
        <mesh>
          <sphereGeometry args={[1.15, 96, 96]} />
          <shaderMaterial
            ref={material}
            glslVersion={THREE.GLSL3}
            uniforms={uniforms}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshBasicMaterial color="#477dff" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.2, 0.4]}>
          <torusGeometry args={[1.55, 0.008, 12, 80]} />
          <meshBasicMaterial color="#ff4b35" transparent opacity={0.7} />
        </mesh>
    </group>
  );
}

function Dust({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const unit = (seed: number) => {
        const value = Math.sin(seed * 127.1) * 43758.5453;
        return value - Math.floor(value);
      };
      const radius = 1.8 + unit(index + 1) * 1.7;
      const theta = unit(index + 19) * Math.PI * 2;
      const phi = Math.acos(2 * unit(index + 41) - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }
    const next = new THREE.BufferGeometry();
    next.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return next;
  }, [count]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#e8e9ef"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas({
  moving,
  dense,
}: {
  moving: boolean;
  dense: boolean;
}) {
  return (
    <Canvas
      dpr={dense ? [1, 1.5] : [1, 1.1]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.4], fov: 35 }}
      frameloop={moving ? "always" : "demand"}
      aria-hidden
    >
      <AdaptiveDpr />
      <Orb moving={moving} />
      <Dust count={dense ? 140 : 48} />
    </Canvas>
  );
}
