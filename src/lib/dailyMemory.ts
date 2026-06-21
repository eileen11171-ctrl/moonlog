// P3-10 — Daily Key Memory storage
// Key: moonlog:daily-memory
// Format: [{ date: "YYYY-MM-DD", text: string }]
// Rules: one entry per day; same-day save overwrites; never touches other keys.

const DAILY_MEMORY_KEY = "moonlog:daily-memory";

export interface DailyMemoryEntry {
  date: string; // "YYYY-MM-DD"
  text: string;
}

const today = (): string => new Date().toISOString().slice(0, 10);

export function getDailyMemories(): DailyMemoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DAILY_MEMORY_KEY);
    return raw ? (JSON.parse(raw) as DailyMemoryEntry[]) : [];
  } catch {
    return [];
  }
}

/** 今天的記憶文字，若無則回傳空字串。 */
export function getTodayMemory(): string {
  return getDailyMemories().find((m) => m.date === today())?.text ?? "";
}

/** 儲存今天的記憶。同一天重複呼叫會覆蓋。空字串不儲存（等同清除）。 */
export function saveDailyMemory(text: string): void {
  if (typeof window === "undefined") return;
  const trimmed = text.trim();
  const all = getDailyMemories().filter((m) => m.date !== today());
  if (trimmed) {
    all.unshift({ date: today(), text: trimmed });
  }
  try {
    localStorage.setItem(DAILY_MEMORY_KEY, JSON.stringify(all));
  } catch {}
}

/** 依日期查詢記憶，用於 Log 頁面。若無則回傳空字串。 */
export function getMemoryForDate(date: string): string {
  return getDailyMemories().find((m) => m.date === date)?.text ?? "";
}
