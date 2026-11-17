import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const paths = ["", ...projects.map((project) => `/work/${project.slug}`), "/profile.md", "/projects.md", "/experience.md", "/llms.txt", "/llms-full.txt"];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: "2026-11-17",
  }));
}
