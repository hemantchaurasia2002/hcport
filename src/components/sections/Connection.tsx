"use client";

import Image from "next/image";
import { photos, profile } from "@/data/profile";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./story.module.scss";

export function Connection() {
  const scope = useScrollAnimation<HTMLElement>();

  return (
    <section id="connection" ref={scope} className={styles.chapter} style={{ ["--glow" as string]: "#477dff", ["--spot-y" as string]: "80%" }}>
      <div className="frame">
        <div className="split">
          <figure data-reveal>
            <div className={styles.portrait} style={{ minHeight: "70vh" }}>
              <Image
                src={photos.formal.src}
                alt={photos.formal.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
            <figcaption className={styles.caption}>
              <span>{profile.status}</span>
              <span>{profile.location}</span>
            </figcaption>
          </figure>
          <div>
            <p className="kicker" data-reveal>
              07 — The connection
            </p>
            <h2 className="display" data-reveal>
              Every great journey gets better with the right people.
            </h2>
            <p className="lede" data-reveal style={{ margin: "1.25rem 0 1.5rem" }}>
              I am open to meaningful conversations, interesting opportunities, new ideas, and collaborations. Recruiters, developers, founders, gaming operators, and people who like explaining how something works are all welcome.
            </p>
            <p data-reveal style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.4rem" }}>
              <span className="status-dot" aria-hidden="true" />
              {profile.status}
            </p>
            <div className="btn-row" data-reveal>
              <a className="btn btn-primary" href={profile.linkedin} target="_blank" rel="noreferrer me">
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
              <a className="btn" href={profile.github} target="_blank" rel="noreferrer me">
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
              <a className="btn" href={`mailto:${profile.email}`}>
                Email
                <span aria-hidden="true">→</span>
              </a>
              <a className="btn" href={profile.resume} download>
                Resume
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
