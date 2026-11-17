"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useSiteScroll } from "@/components/layout/SmoothScroll";
import { CommandPalette } from "./CommandPalette";

export function Header() {
  const pathname = usePathname();
  const { scrollTo, stop, start } = useSiteScroll();
  const [menu, setMenu] = useState(false);
  const [command, setCommand] = useState(false);
  const closeCommand = useCallback(() => setCommand(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommand((open) => !open);
      }
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!menu) {
      start();
      document.body.style.overflow = "";
      return;
    }
    stop();
    document.body.style.overflow = "hidden";
    const node = document.getElementById("nav-overlay");
    const focusable = node?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();
    return () => {
      document.body.style.overflow = "";
      start();
    };
  }, [menu, start, stop]);

  function go(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setMenu(false);
    if (pathname === "/") {
      event.preventDefault();
      scrollTo(`#${id}`);
    }
  }

  return (
    <>
      <header className="nav">
        <a
          className="nav-name"
          href={pathname === "/" ? "#arrival" : "/#arrival"}
          onClick={(event) => go(event, "arrival")}
        >
          {profile.name}
        </a>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.id} href={pathname === "/" ? `#${item.id}` : `/#${item.id}`} onClick={(event) => go(event, item.id)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="nav-icon" type="button" onClick={() => setCommand(true)}>
            Command
          </button>
          <button
            className="nav-icon"
            type="button"
            aria-expanded={menu}
            aria-controls="nav-overlay"
            onClick={() => setMenu((open) => !open)}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menu ? (
          <motion.div
            id="nav-overlay"
            className="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="nav-overlay-top">
              <p className="kicker">Navigation</p>
              <button className="nav-icon" type="button" onClick={() => setMenu(false)}>
                Close
              </button>
            </div>
            <motion.nav
              className="nav-overlay-list"
              aria-label="Sections"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={pathname === "/" ? `#${item.id}` : `/#${item.id}`}
                  onClick={(event) => go(event, item.id)}
                  variants={{ hidden: { y: 28, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                >
                  {item.label}
                  <span>0{index + 1}</span>
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {command ? <CommandPalette open onClose={closeCommand} /> : null}
    </>
  );
}
