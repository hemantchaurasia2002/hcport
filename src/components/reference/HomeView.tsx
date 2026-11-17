"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortraitField } from "./PortraitField";
import { StructureField } from "./StructureField";
import { photos, profile } from "@/data/profile";
import { internship, storm } from "@/data/experience";
import { projects } from "@/data/projects";

const disciplines = [
  {
    index: "01",
    title: "Build",
    heading: "Give an idea a working form.",
    body: "I write interfaces and small programs so I can see how a request, a page, or a piece of data actually behaves.",
    tags: "JavaScript · React · Next.js · Golang · SQL",
  },
  {
    index: "02",
    title: "Operate",
    heading: "Keep a real system usable.",
    body: "At Maaricha I maintained a live website. At Storm Esports I kept a Discord of about 15,000 members organized: scrims, registrations, roles, and bots.",
    tags: "Website maintenance · Troubleshooting · Discord · Community operations",
  },
  {
    index: "03",
    title: "Explore",
    heading: "Stay curious without pretending.",
    body: "I am learning toward AI data quality and gaming LiveOps. Those are interests, not claims of professional expertise.",
    tags: "Data quality · Content evaluation · LiveOps · Player communities",
  },
];

const journey = [
  { when: "2021", title: "Started the degree.", detail: "B.Tech in Computer Science Engineering at Khwaja Moinuddin Chishti Language University, Lucknow." },
  { when: "2023", title: "Contributed in public.", detail: "Participated in Hacktoberfest and made open-source contributions." },
  { when: "2024", title: "Worked on a live site.", detail: `${internship.role} at ${internship.org}, ${internship.where}. ${internship.when}.` },
  { when: "Community", title: "Ran a large Discord.", detail: `${storm.summary}` },
  { when: "2025", title: "Finished the degree.", detail: "Graduated with the SGPA of 7.0 stated on my resume." },
  { when: "Now", title: "Open to what is next.", detail: "Looking for early-career work in software, support, operations, or communities where I can learn and contribute." },
];

const lenses = [
  {
    label: "Build",
    title: "Give an idea a working form.",
    body: "Interfaces and small programs. A request, a page, or a piece of data, followed until it actually behaves.",
    steps: ["Understand the task", "Shape the interface", "Build the thing"],
    href: "#work",
    cta: "Explore the work ↗",
  },
  {
    label: "Operate",
    title: "Keep a real system usable.",
    body: "Six months maintaining a live site at Maaricha, and a Discord of about 15,000 members at Storm Esports.",
    steps: ["Find what broke", "Fix the piece", "Tell the people waiting"],
    href: "#experience",
    cta: "Read the experience ↗",
  },
  {
    label: "Explore",
    title: "Stay curious, and say so.",
    body: "AI data quality and gaming LiveOps are directions I am learning toward. They are interests, not a claim of professional expertise.",
    steps: ["Notice the pattern", "Try a small version", "Keep the claim honest"],
    href: "#places",
    cta: "See the photographs ↗",
  },
];

const places = [
  { photo: photos.ridgeCamera, kicker: "Out on a ridge", title: "Still looking." },
  { photo: photos.ridgeOpen, kicker: "Further out", title: "The next version." },
];

export function HomeView() {
  const [open, setOpen] = useState(0);
  const [lens, setLens] = useState(0);
  const [motion, setMotion] = useState(true);
  const view = lenses[lens];

  return (
    <div className="ref" style={{ scrollBehavior: motion ? "smooth" : "auto" }}>
      <PortraitField motion={motion} />
      <section className="hero" id="top">
        <p className="side side-left">Builder. Operator. Explorer.</p>
        <p className="side side-right">Based in Lucknow · Open to work</p>
        <div className="presence">
          01 / PRESENCE
          <ul>
            <li>ENGINEERING</li>
            <li>COMMUNITY</li>
            <li>CURIOSITY</li>
          </ul>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">A human perspective on technology</p>
          <h1>{profile.name}</h1>
          <p className="lede">I build for the web, learn by making small tools, and keep digital communities running.</p>
          <div className="cta-row">
            <a className="pill" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#connect">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-foot">
          <a href="#about">Scroll to discover ↓</a>
          <span>Computer science · Lucknow</span>
          <span>An ongoing exploration ↗</span>
        </div>
      </section>

      <section className="stats" aria-label="Career highlights">
        <article className="stat">
          <strong>15,000+</strong>
          <span>members on the Storm Esports Discord I managed</span>
        </article>
        <article className="stat">
          <strong>6 mo</strong>
          <span>web development internship at Maaricha, Lucknow</span>
        </article>
        <article className="stat">
          <strong>5</strong>
          <span>projects, from Golang servers to a resume builder</span>
        </article>
      </section>

      <section className="section" id="about">
        <div className="wrap">
          <p className="kicker"><span>Three disciplines. One perspective.</span><span>0{lens + 1} / 03</span></p>
          <div className="split about-grid">
            <div>
              <StructureField motion={motion} />
              <p className="structure-label">Structure</p>
              <div className="lens" role="tablist" aria-label="Choose a perspective">
                {lenses.map((item, index) => (
                  <button key={item.label} type="button" role="tab" aria-selected={lens === index} className={lens === index ? "on" : ""} onClick={() => setLens(index)}>
                    {item.label} <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              <h3 className="lens-title">{view.title}</h3>
              <p>{view.body}</p>
              <p style={{ marginTop: "1rem" }}><a className="text-link" href={view.href}>{view.cta}</a></p>
              <p className="structure-label" style={{ textAlign: "left", marginTop: "1.4rem" }}>Choose a perspective.</p>
            </div>
            <div>
              <h2 className="statement">Technology is the starting point. <em>People are the point.</em></h2>
              <p className="lede" style={{ marginLeft: 0 }}>I connect building, fixing, and bringing people into the same digital space.</p>
              <p>I am a Computer Science Engineering graduate from Khwaja Moinuddin Chishti Language University. The work so far is an internship on a live website, a set of small programs, and a gaming community of about 15,000 people.</p>
              <p style={{ marginTop: "1.2rem" }}><a className="text-link" href="#experience">Read the story ↗</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="wrap">
          <p className="kicker"><span><i>■</i> 02 / Selected work</span><span>Built. Maintained. Put on GitHub.</span></p>
          <h2 className="statement">Ideas are a start. <em>This is the work.</em></h2>
          <p className="lede" style={{ margin: "1rem 0 2rem" }}>Personal projects, summer training, and internship maintenance. No invented results.</p>
          <div className="feature-grid">
            {projects.slice(0, 3).map((project) => (
              <Link className="feature" key={project.slug} href={`/work/${project.slug}`}>
                <p className="index">{project.index} / {project.kind}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span>{project.stack.join(" · ")} ↗</span>
              </Link>
            ))}
          </div>
          <div className="work-list">
            {projects.slice(3).map((project) => (
              <Link className="work-row" key={project.slug} href={`/work/${project.slug}`}>
                <small>{project.index}</small>
                <div>
                  <p className="index">{project.kind} · {project.stack.join(" · ")}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="wrap">
          <p className="kicker"><span><i>■</i> 03 / How I work</span><span>Choose a discipline</span></p>
          <h2 className="statement">From a task to something people can use.</h2>
          <div style={{ marginTop: "2rem" }}>
            {disciplines.map((item, index) => {
              const active = open === index;
              return (
                <button key={item.title} className="discipline" type="button" aria-expanded={active} onClick={() => setOpen(index)}>
                  <p className="index">{item.index} / {item.title}</p>
                  <h3>{item.heading}</h3>
                  {active ? (
                    <>
                      <p>{item.body}</p>
                      <p className="tags">{item.tags}</p>
                    </>
                  ) : null}
                </button>
              );
            })}
          </div>
          <div className="timeline" style={{ marginTop: "3.5rem" }}>
            {journey.map((item) => (
              <article key={item.when}>
                <p className="index">{item.when}</p>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="places">
        <div className="wrap">
          <p className="kicker"><span><i>■</i> 04 / Away from the screen</span><span>Real photographs</span></p>
          <h2 className="statement">The same person. <em>A different room.</em></h2>
          <div className="frames">
            {places.map((place) => (
              <figure key={place.title}>
                <Image src={place.photo.src} alt={place.photo.alt} width={place.photo.width} height={place.photo.height} />
                <figcaption>
                  <span>{place.kicker}</span>
                  <strong>{place.title}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section close" id="connect">
        <div className="wrap">
          <p className="eyebrow">Open to work · Lucknow</p>
          <h2>Something useful starts with a hello.</h2>
          <p className="lede">Recruiters, developers, and people building communities. If our worlds overlap, I would like to hear from you.</p>
          <div className="socials">
            <a className="pill" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="pill" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="pill" href={`mailto:${profile.email}`}>Email</a>
            <a className="pill" href={profile.resume} download>Resume</a>
          </div>
        </div>
      </section>
      <button className="motion-toggle" type="button" onClick={() => setMotion((value) => !value)}>
        Motion {motion ? "on" : "off"}
      </button>
    </div>
  );
}
