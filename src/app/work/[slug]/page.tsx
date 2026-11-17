import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, siteUrl } from "@/data/profile";
import { getProject, projects } from "@/data/projects";
import styles from "./case.module.scss";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.summary,
    ...(siteUrl ? { alternates: { canonical: `/work/${project.slug}` } } : {}),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    creator: { "@type": "Person", name: profile.name },
    keywords: project.stack.join(", "),
    ...(project.href ? { sameAs: project.href } : {}),
  };

  return (
    <article className={`frame page-case ${styles.page}`}>
      <p>
        <Link className={styles.back} href="/#builder">
          Back to work
        </Link>
      </p>
      <p className="kicker" style={{ marginTop: "2rem" }}>
        {project.index} — {project.kind}
      </p>
      <h1 className="display" style={{ marginTop: "0.6rem" }}>
        {project.title}
      </h1>
      <p className="lede" style={{ marginTop: "1.2rem" }}>
        {project.summary}
      </p>
      <ul className={styles.stackList}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <section className={styles.block}>
        <h2 className="display-md">Objective</h2>
        <p style={{ marginTop: "0.8rem" }}>{project.objective}</p>
      </section>
      <section className={styles.block}>
        <h2 className="display-md">The problem</h2>
        <p style={{ marginTop: "0.8rem" }}>{project.problem}</p>
      </section>
      <section className={styles.block}>
        <h2 className="display-md">What I did</h2>
        <ul className={styles.stackList} style={{ display: "grid" }}>
          {project.contribution.map((item) => (
            <li key={item} style={{ textTransform: "none", letterSpacing: "0", fontFamily: "inherit", fontSize: "1rem" }}>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.block}>
        <h2 className="display-md">Process</h2>
        <ol style={{ marginTop: "0.8rem" }}>
          {project.process.map((item, index) => (
            <li key={item} style={{ padding: "0.55rem 0", borderTop: "1px solid rgba(232,233,239,0.14)" }}>
              0{index + 1} — {item}
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.block}>
        <h2 className="display-md">What was difficult</h2>
        <p style={{ marginTop: "0.8rem" }}>{project.challenges}</p>
      </section>
      <p className={styles.missing}>
        No screenshots were included for this project, so the page does not use a substitute image.
      </p>
      {project.href ? (
        <p style={{ marginTop: "1.5rem" }}>
          <a className="btn btn-primary" href={project.href} target="_blank" rel="noreferrer">
            View on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </p>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
