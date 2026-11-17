"use client";

type ScrollApi = {
  scrollTo: (target: string | HTMLElement) => void;
  stop: () => void;
  start: () => void;
};

let api: ScrollApi = {
  scrollTo: (target) => {
    const node = typeof target === "string" ? document.querySelector(target) : target;
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  },
  stop: () => undefined,
  start: () => undefined,
};

export function setScrollApi(next: ScrollApi) {
  api = next;
}

export function getScrollApi() {
  return api;
}
