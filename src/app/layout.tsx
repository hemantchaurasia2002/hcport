import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { profile, siteUrl } from "@/data/profile";
import "@/styles/main.scss";
import "@/styles/reference.scss";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
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
        url: "/images/personal/portrait-formal-cut.png",
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
    images: ["/images/personal/portrait-formal-cut.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal],.hero-animate{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
