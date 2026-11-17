"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { commands, type CommandItem } from "@/data/navigation";
import { useSiteScroll } from "@/components/layout/SmoothScroll";
import { transitionTo } from "@/animations/transitionManager";

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const pathname = usePathname();
  const router = useRouter();
  const { scrollTo } = useSiteScroll();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return commands;
    return commands.filter((item) => `${item.label} ${item.hint} ${item.id}`.toLowerCase().includes(term));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => input.current?.focus(), 20);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  function run(item: CommandItem) {
    onClose();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.href.startsWith("mailto:") || item.href.endsWith(".pdf")) {
      transitionTo(item.href);
      return;
    }
    if (pathname === "/" && item.href.startsWith("/#")) {
      scrollTo(item.href.slice(1));
      return;
    }
    router.push(item.href);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="command"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="command-panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <h2 id={titleId} className="sr-only">
              Command navigation
            </h2>
            <input
              ref={input}
              className="command-input"
              value={query}
              placeholder="Type home, work, experience, contact"
              aria-label="Command"
              onChange={(event) => {
                setQuery(event.target.value);
                setCursor(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setCursor((value) => Math.min(value + 1, results.length - 1));
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setCursor((value) => Math.max(value - 1, 0));
                }
                if (event.key === "Enter" && results[cursor]) run(results[cursor]);
              }}
            />
            <div className="command-list">
              {results.map((item, index) => (
                <button key={item.id} type="button" data-active={index === cursor} onClick={() => run(item)}>
                  {item.label}
                  <small>{item.hint}</small>
                </button>
              ))}
              {results.length === 0 ? <p className="command-input">Nothing matches that.</p> : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
