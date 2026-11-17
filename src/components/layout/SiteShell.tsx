"use client";

import { Suspense, type ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { Header } from "@/components/navigation/Header";
import { ChapterRail } from "@/components/navigation/ChapterRail";
import { Cursor } from "@/components/ui/Cursor";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <Suspense fallback={<div className="nav" />}>
        <Header />
        <ChapterRail />
      </Suspense>
      <main id="main">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
