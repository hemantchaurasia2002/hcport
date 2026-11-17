"use client";

import Image from "next/image";
import { contributions, directions, photos } from "@/data/profile";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./story.module.scss";

export function NextVersion() {
  const scope = useScrollAnimation<HTMLElement>();

  return (
    <section id="next" ref={scope} className={styles.chapter} style={{ ["--glow" as string]: "#ff4b35" }}>
      <div className="frame">
        <div className={styles.chapterHead}>
          <p className="kicker" data-reveal>
            06 — The next version
          </p>
          <h2 className="display" data-reveal>
            I&apos;m not done building. I&apos;m just getting started.
          </h2>
          <p className="lede" data-reveal>
            I want a career in technology where I can keep learning, work on real problems, and get better by being around people who take the work seriously. The directions below are interests. They are not equal claims of expertise.
          </p>
        </div>
        <figure data-reveal>
          <div className={styles.portrait} style={{ minHeight: "78vh" }}>
            <Image
              src={photos.ridgeOpen.src}
              alt={photos.ridgeOpen.alt}
              fill
              sizes="(max-width: 900px) 100vw, 80vw"
              style={{ objectPosition: "center 35%" }}
            />
          </div>
          <figcaption className={styles.caption}>
            <span>The next version</span>
            <span>Further out</span>
          </figcaption>
        </figure>
        <div className="horizon" data-reveal aria-hidden="true" />
        <ul className={styles.ledger}>
          {directions.map((item, index) => (
            <li key={item.title} data-reveal>
              <span className={styles.index}>0{index + 1}</span>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
        <div className="two" style={{ marginTop: "3rem" }}>
          {contributions.map((item) => (
            <article key={item.title} className={styles.panel} data-reveal>
              <h3>{item.title}</h3>
              <p style={{ marginTop: "0.6rem" }}>{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="lede" data-reveal style={{ marginTop: "2.5rem" }}>
          The longer aim is not only a job title. It is a working life of useful projects, sharper skills, and people who make each other better. I do not want that identity limited to a degree or a single stack.
        </p>
      </div>
    </section>
  );
}
