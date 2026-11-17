"use client";

import Image from "next/image";
import { courses, photos } from "@/data/profile";
import { explorations } from "@/data/interests";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./story.module.scss";

export function Explorer() {
  const scope = useScrollAnimation<HTMLElement>();

  return (
    <section id="explorer" ref={scope} className={styles.chapter} style={{ ["--glow" as string]: "#a98bff", ["--spot-x" as string]: "70%" }}>
      <div className="frame">
        <div className={styles.chapterHead}>
          <p className="kicker" data-reveal>
            05 — The explorer
          </p>
          <h2 className="display" data-reveal>
            The most interesting things are still waiting to be discovered.
          </h2>
          <p className="lede" data-reveal>
            These are areas I am learning and want to work in. They are not listed as established expertise.
          </p>
        </div>
        <figure data-reveal>
          <div className={styles.portrait} style={{ minHeight: "72vh" }}>
            <Image
              src={photos.ridgeCamera.src}
              alt={photos.ridgeCamera.alt}
              fill
              sizes="100vw"
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <figcaption className={styles.caption}>
            <span>Out on a ridge</span>
            <span>Still looking</span>
          </figcaption>
        </figure>
        <div className="two" style={{ marginTop: "3rem" }}>
          {explorations.map((item) => (
            <article key={item.title} className={styles.panel} data-reveal>
              <p className="kicker">{item.tone}</p>
              <h3 className="display-md">{item.title}</h3>
              <p className={styles.note} style={{ margin: "0.8rem 0 1rem" }}>
                {item.note}
              </p>
              <ul>
                {item.points.map((point) => (
                  <li key={point} style={{ padding: "0.55rem 0", borderTop: "1px solid rgba(232,233,239,0.14)" }}>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div style={{ marginTop: "3.5rem" }} data-reveal>
          <p className="kicker">Courses listed on my LinkedIn</p>
          <p className={styles.note}>
            I have not re-checked the credential links while building this site. Treat them as courses on the public profile, not as freshly verified certificates.
          </p>
          <ul className={styles.ledger}>
            {courses.map((course) => (
              <li key={course.name}>
                <span className={styles.index}>{course.when}</span>
                <strong>{course.name}</strong>
                <span>{"org" in course ? course.org : "LinkedIn listing"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
