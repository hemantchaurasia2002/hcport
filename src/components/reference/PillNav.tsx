"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#connect", label: "Connect" },
];

export function PillNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === "/";

  return (
    <header className="ref-nav">
      <Link className="ref-brand" href={home ? "#top" : "/"}>
        {profile.name}
      </Link>
      <nav className="ref-links" aria-label="Main navigation">
        {links.map((link) => (
          <Link key={link.href} href={home ? link.href.slice(1) : link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="ref-talk" href={home ? "#connect" : "/#connect"}>
        Let’s talk <span aria-hidden="true">↗</span>
      </Link>
      <button className="ref-menu" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <nav
          aria-label="Mobile"
          style={{
            position: "absolute",
            top: "calc(100% + 0.6rem)",
            left: 0,
            right: 0,
            display: "grid",
            gap: "0.8rem",
            padding: "1rem",
            border: "1px solid rgba(241,238,232,0.16)",
            borderRadius: "1.2rem",
            background: "#0c0c0c",
          }}
        >
          {links.map((link) => (
            <Link key={link.href} href={home ? link.href.slice(1) : link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
