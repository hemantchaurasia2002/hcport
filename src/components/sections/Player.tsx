"use client";

import { playerNotes } from "@/data/interests";
import { profile } from "@/data/profile";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./story.module.scss";

export function Player() {
  const scope = useScrollAnimation<HTMLElement>();

  return (
    <section id="player" ref={scope} className={styles.chapter} style={{ ["--glow" as string]: "#a98bff" }}>
      <div className="frame">
        <div className={styles.chapterHead}>
          <p className="kicker" data-reveal>
            04 — The player
          </p>
          <h2 className="display" data-reveal>
            Not just playing the game. Understanding the world behind it.
          </h2>
          <p className="lede" data-reveal>
            Gaming is part of how I learned to organize people, not a costume for the rest of the site. The work sits in three places: playing, making, and running the space around the match.
          </p>
        </div>
        <div className="three">
          {playerNotes.map((note) => (
            <article key={note.title} data-reveal style={{ padding: "1.5rem", background: "#08090d" }}>
              <h3 className="display-md" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                {note.title}
              </h3>
              <p style={{ marginTop: "1rem" }}>{note.detail}</p>
            </article>
          ))}
        </div>
        <p className={styles.note} data-reveal style={{ marginTop: "1.5rem" }}>
          {profile.youtubeNote} Gameplay stills were not part of the files for this site, so this chapter stays with the work rather than a stand-in screenshot.
        </p>
      </div>
    </section>
  );
}
