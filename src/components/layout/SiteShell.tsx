"use client";

import { Suspense, type ReactNode } from "react";
import { PillNav } from "@/components/reference/PillNav";
import { profile } from "@/data/profile";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Suspense fallback={null}>
        <PillNav />
      </Suspense>
      <main id="main">{children}</main>
      <footer className="foot">
        <p>{profile.name}</p>
        <p>{profile.location}</p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}
