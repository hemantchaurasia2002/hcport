"use client";

import Link from "next/link";
import { skillGroups, internship } from "@/data/experience";
import { projects } from "@/data/projects";
import { achievements } from "@/data/profile";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./story.module.scss";

export function Builder() {
  const scope = useScrollAnimation<HTMLElement>();

  return (
    <section id="builder" ref={scope} className={styles.chapter} style={{ ["--glow" as string]: "#477dff" }}>
      <div className="frame">
        <div className={styles.chapterHead}>
          <p className="kicker" data-reveal>
            02 — The builder
          </p>
          <h2 className="display" data-reveal>
            The builder.
          </h2>
          <p className="lede" data-reveal>
            I write interfaces, small servers, and tools that show me how software actually behaves. The projects below are personal work, training, and internship maintenance. They are not products with invented results.
          </p>
        </div>
        <ul className={styles.ledger}>
          {skillGroups.map((group) => (
            <li key={group.label} data-reveal>
              <span className={styles.index}>{group.index}</span>
              <strong>{group.label}</strong>
              <span>{group.items.join(" · ")}</span>
            </li>
          ))}
        </ul>

        <div className={styles.panel} data-reveal style={{ marginTop: "3.5rem" }}>
          <p className="kicker">In practice</p>
          <h3 className="display-md">
            {internship.role}, {internship.org}
          </h3>
          <p className={styles.note} style={{ margin: "0.8rem 0 1rem" }}>
            {internship.when} · {internship.where}
          </p>
          <p className="lede">{internship.summary}</p>
        </div>

        <div style={{ marginTop: "4rem" }}>
          <p className="kicker" data-reveal>
            Selected work
          </p>
          <div className={styles.ledger}>
            {projects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} data-reveal>
                <span className={styles.index}>{project.index}</span>
                <strong>
                  {project.title}
                  <br />
                  <span className={styles.note}>{project.kind}</span>
                </strong>
                <span>
                  {project.summary}
                  <br />
                  <span className={styles.index}>{project.stack.join(" · ")} · Case study</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <ul className="two" style={{ marginTop: "3rem" }}>
          {achievements.map((item) => (
            <li key={item.title} className={styles.panel} data-reveal>
              <h3>{item.title}</h3>
              <p className={styles.note} style={{ marginTop: "0.6rem" }}>
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
