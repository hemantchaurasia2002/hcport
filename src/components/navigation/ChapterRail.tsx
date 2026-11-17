"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { chapters } from "@/data/navigation";
import { registerChapter } from "@/animations/animationRegistry";
import { useSiteScroll } from "@/components/layout/SmoothScroll";
import styles from "@/components/sections/story.module.scss";

export function ChapterRail() {
  const pathname = usePathname();
  const { scrollTo } = useSiteScroll();
  const [active, setActive] = useState("arrival");

  useEffect(() => {
    chapters.forEach((chapter) => registerChapter(chapter.id));
    const nodes = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <nav className={styles.rail} aria-label="Chapters">
      {chapters.map((chapter) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          data-active={active === chapter.id}
          aria-label={`${chapter.index} ${chapter.label}`}
          onClick={(event) => {
            event.preventDefault();
            scrollTo(`#${chapter.id}`);
          }}
        >
          {chapter.index}
          <i />
        </a>
      ))}
    </nav>
  );
}
