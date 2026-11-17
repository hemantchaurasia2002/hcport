import { chapters } from "@/data/navigation";

export type ChapterId = (typeof chapters)[number]["id"];

const seen = new Set<ChapterId>();

export function registerChapter(id: ChapterId) {
  seen.add(id);
}

export function registeredChapters() {
  return chapters.filter((chapter) => seen.has(chapter.id));
}
