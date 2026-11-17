import { Arrival } from "@/components/sections/Arrival";
import { Builder } from "@/components/sections/Builder";
import { Connection } from "@/components/sections/Connection";
import { Explorer } from "@/components/sections/Explorer";
import { Human } from "@/components/sections/Human";
import { NextVersion } from "@/components/sections/NextVersion";
import { Operator } from "@/components/sections/Operator";
import { Player } from "@/components/sections/Player";
import { profile, siteUrl } from "@/data/profile";
import { projects } from "@/data/projects";

const person = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: profile.title,
  description: profile.description,
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Khwaja Moinuddin Chishti Language University",
    },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: ["JavaScript", "React", "Next.js", "Golang", "Python", "SQL", "Web development", "Community management"],
    description: profile.description,
  },
  hasPart: projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    ...(siteUrl ? { url: `${siteUrl}/work/${project.slug}` } : {}),
  })),
};

export default function HomePage() {
  return (
    <>
      <Arrival />
      <Human />
      <Builder />
      <Operator />
      <Player />
      <Explorer />
      <NextVersion />
      <Connection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </>
  );
}
