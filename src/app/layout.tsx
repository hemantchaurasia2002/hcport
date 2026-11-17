import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { profile, siteUrl } from "@/data/profile";
import "lenis/dist/lenis.css";
import "@/styles/main.scss";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: profile.title,
    template: "%s · Hemant Chaurasia",
  },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Hemant Chaurasia",
    "Lucknow",
    "web developer",
    "frontend",
    "Golang",
    "Next.js",
    "community management",
    "esports",
  ],
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    title: profile.title,
    description: profile.description,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/personal/portrait-formal.jpg",
        width: 1024,
        height: 854,
        alt: "Hemant Chaurasia in a navy suit and glasses.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.title,
    description: profile.description,
    images: ["/images/personal/portrait-formal.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} js`}>
      <body>
        <noscript>
          <style>{`[data-reveal],.hero-animate{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
