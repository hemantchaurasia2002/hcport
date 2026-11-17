import { HomeView } from "@/components/reference/HomeView";
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
      <HomeView />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </>
  );
}
