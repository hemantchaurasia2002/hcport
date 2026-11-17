"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { masterTimeline } from "@/animations/timelineManager";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteScroll } from "@/components/layout/SmoothScroll";
import { GlassScene } from "@/components/three/GlassScene";
import { photos, profile } from "@/data/profile";
import styles from "./arrival.module.scss";

export function Arrival() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollTo } = useSiteScroll();
  const [visible, setVisible] = useState(true);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    const safety = window.setTimeout(() => {
      const hidden = node.querySelector(".hero-animate");
      if (hidden && getComputedStyle(hidden).opacity === "0") setSettled(true);
    }, 2200);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  useGSAP(
    () => {
      if (reduced || settled) return;
      const timeline = masterTimeline();
      timeline
        .fromTo(
          ".hero-animate",
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.95 },
          0.05,
        )
        .to(".letterbox", { scaleY: 0, duration: 1.05, ease: "power3.inOut" }, 0.3);
      return () => {
        timeline.kill();
      };
    },
    { scope: root, dependencies: [reduced, settled] },
  );

  return (
    <section id="arrival" ref={root} className={`${styles.arrival} ${settled ? styles.settled : ""}`}>
      <div className={styles.scene}>
        <GlassScene active={visible} />
      </div>
      {!reduced && !settled ? (
        <>
          <div className="letterbox" aria-hidden="true" />
          <div className="letterbox letterbox-bottom" aria-hidden="true" />
          <button
            className="intro-skip"
            type="button"
            onClick={() => {
              setSettled(true);
              gsap.set(".hero-animate", { autoAlpha: 1, y: 0 });
              gsap.set(".letterbox", { scaleY: 0 });
            }}
          >
            Skip animation
          </button>
        </>
      ) : null}
      <div className={`frame ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="kicker hero-animate">00 — The arrival</p>
          <p className={`${styles.statement} hero-animate`}>
            Not everything is built to follow a straight line.
          </p>
          <p className="lede hero-animate">Some journeys are built through curiosity.</p>
          <h1 className={`${styles.name} hero-animate`}>{profile.name}</h1>
          <p className="hero-animate">A mind that builds, explores, and keeps evolving.</p>
          <div className={`${styles.meta} hero-animate`}>
            <span>{profile.location}</span>
            <span>{profile.coordinates}</span>
            <span>{profile.status}</span>
          </div>
          <div className="hero-animate">
            <a
              className="btn btn-primary"
              href="#human"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("#human");
              }}
            >
              Enter my world
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <figure className={`${styles.media} hero-animate`}>
          <Image
            src={photos.formal.src}
            alt={photos.formal.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 38vw"
          />
        </figure>
      </div>
    </section>
  );
}
