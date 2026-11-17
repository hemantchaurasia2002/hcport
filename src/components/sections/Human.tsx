"use client";

import Image from "next/image";
import { education, photos, profile } from "@/data/profile";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";
import styles from "./story.module.scss";

export function Human() {
  const scopeRef = useScrollAnimation<HTMLElement>();
  const textRef = useTextReveal<HTMLElement>();

  return (
    <section
        id="human"
        ref={(node) => {
          scopeRef.current = node;
          textRef.current = node;
        }}
        className={styles.chapter}
        style={{ ["--glow" as string]: "#f3a54a", ["--spot-x" as string]: "10%" }}
      >
      <div className="frame">
        <div className={styles.chapterHead}>
          <p className="kicker" data-reveal>
            01 — The human
          </p>
          <h2 className="display" data-split>
            Behind every creation, there is a creator.
          </h2>
        </div>
        <div className="split">
          <figure data-reveal>
            <div className={styles.portrait} style={{ minHeight: "68vh" }}>
              <Image
                src={photos.evening.src}
                alt={photos.evening.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectPosition: "center 18%" }}
              />
            </div>
            <figcaption className={styles.caption}>
              <span>Lucknow</span>
              <span>Evening</span>
            </figcaption>
          </figure>
          <div className="prose" data-reveal>
            <p>
              I am Hemant Chaurasia, a Computer Science Engineering graduate from Khwaja Moinuddin Chishti Language University in Lucknow.
            </p>
            <p>
              I like taking something apart until I understand it: a website, a server, a registration flow, a community that has grown faster than its channels. Then I try to make that thing work a little more cleanly.
            </p>
            <p>
              So far that has meant programming, web development, website and database maintenance, troubleshooting, and running a large gaming community. I am looking for early-career work where I can contribute, learn beside people who have already done it, and stay close to real problems.
            </p>
            <p className={styles.note}>
              {profile.status}. Based in {profile.location}.
            </p>
          </div>
        </div>
        <ul className={styles.ledger} style={{ marginTop: "3rem" }}>
          {education.map((item, index) => (
            <li key={item.place} data-reveal>
              <span className={styles.index}>0{index + 1}</span>
              <strong>{item.place}</strong>
              <span>
                {item.detail}
                <br />
                <span className={styles.note}>{item.meta}</span>
              </span>
            </li>
          ))}
        </ul>
        <figure data-reveal style={{ marginTop: "3.5rem" }}>
          <div className={styles.portrait} style={{ minHeight: "62vh" }}>
            <Image
              src={photos.gathering.src}
              alt={photos.gathering.alt}
              fill
              sizes="100vw"
              style={{ objectPosition: "center 42%" }}
            />
          </div>
          <figcaption className={styles.caption}>
            <span>Away from the desk</span>
            <span>An evening gathering</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
