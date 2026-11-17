"use client";

import { useEffect, useRef } from "react";
import { internship, storm } from "@/data/experience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./story.module.scss";

function Network() {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    let played = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        const paths = node.querySelectorAll("path");
        void import("animejs").then((mod) => {
          const anime = mod.default;
          anime({
            targets: paths,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: "easeInOutSine",
            duration: 1500,
            delay: anime.stagger(80),
          });
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <svg ref={ref} className={styles.network} viewBox="0 0 460 280" role="img" aria-label="A simple network of connected points">
      <path d="M40 160 L140 70 L250 150 L360 60 L420 140" />
      <path d="M140 70 L160 210 L250 150 L300 220 L420 140" />
      <path d="M40 160 L160 210" />
      <path d="M250 150 L360 60" />
      <circle cx="40" cy="160" r="4" />
      <circle cx="140" cy="70" r="4" />
      <circle cx="160" cy="210" r="4" />
      <circle cx="250" cy="150" r="5" />
      <circle cx="300" cy="220" r="4" />
      <circle cx="360" cy="60" r="4" />
      <circle cx="420" cy="140" r="4" />
    </svg>
  );
}

export function Operator() {
  const scope = useScrollAnimation<HTMLElement>();

  return (
    <section id="operator" ref={scope} className={styles.chapter} style={{ ["--glow" as string]: "#52d6c4", ["--spot-x" as string]: "0%" }}>
      <div className="frame">
        <div className={styles.chapterHead}>
          <p className="kicker" data-reveal>
            03 — The operator
          </p>
          <h2 className="display" data-reveal>
            Building digital spaces. Bringing people together.
          </h2>
          <p className="lede" data-reveal>
            Before the community work, I spent six months inside a working website. Both experiences taught me the same thing: a system is only as good as the people who can still use it on an ordinary day.
          </p>
        </div>
        <div className="two">
          <article className={styles.panel} data-reveal>
            <p className="kicker">Internship</p>
            <h3 className="display-md">{internship.org}</h3>
            <p className={styles.note}>
              {internship.role}
              <br />
              {internship.when} · {internship.where}
            </p>
            <ul style={{ marginTop: "1.2rem" }}>
              {internship.points.map((point) => (
                <li key={point} style={{ padding: "0.45rem 0", borderTop: "1px solid rgba(232,233,239,0.14)" }}>
                  {point}
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.panel} data-reveal>
            <p className="kicker">Community</p>
            <h3 className="display-md">{storm.org}</h3>
            <p className={styles.stat}>{storm.scale}</p>
            <p style={{ marginTop: "1rem" }}>{storm.summary}</p>
            <Network />
          </article>
        </div>
        <ul className={styles.ledger} style={{ marginTop: "1rem" }}>
          {storm.points.map((point, index) => (
            <li key={point} data-reveal>
              <span className={styles.index}>0{index + 1}</span>
              <span style={{ gridColumn: "2 / -1" }}>{point}</span>
            </li>
          ))}
        </ul>
        <p className={styles.note} data-reveal style={{ marginTop: "1.5rem" }}>
          I am not publishing engagement rates or tournament attendance. Those numbers were not part of the record I am working from.
        </p>
      </div>
    </section>
  );
}
