// 共用的本地儲存：星光值 + 每日伸展完成旗標
const today = () => new Date().toISOString().slice(0, 10);

export function getStar(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem("moonlog:star") || "0") || 0;
}
export function setStar(n: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem("moonlog:star", String(Math.max(0, Math.round(n))));
}
export function addStar(delta: number) {
  setStar(getStar() + delta);
}

export function isStretchDoneToday(): boolean {
  try {
    const raw = localStorage.getItem("moonlog:stretch");
    if (!raw) return false;
    const p = JSON.parse(raw);
    return p?.date === today() && !!p.done;
  } catch {
    return false;
  }
}
export function setStretchDoneToday(done: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("moonlog:stretch", JSON.stringify({ date: today(), done }));
}

// ── 一次性「剛獲得星光」訊號：stretch 完成 → 首頁讀取後播放成長回饋 ──
export type Earned = { amount: number; grew: boolean };

export function setEarned(amount: number, grew: boolean) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("moonlog:earned", JSON.stringify({ amount, grew }));
}
export function consumeEarned(): Earned | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem("moonlog:earned");
  if (!raw) return null;
  sessionStorage.removeItem("moonlog:earned");
  try {
    return JSON.parse(raw) as Earned;
  } catch {
    return null;
  }
}

// ── Moon Reflection（Phase 2A/2B）────────────────────────────────────────────

export interface ReflectionEntry {
  id: string;
  date: string;          // "YYYY-MM-DD"
  type: "stretch" | "ritual";
  stars: number;
  reflection: string;
}

const REFLECTIONS_KEY = "moonlog:reflections";

function genId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getReflections(): ReflectionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REFLECTIONS_KEY);
    return raw ? (JSON.parse(raw) as ReflectionEntry[]) : [];
  } catch {
    return [];
  }
}

/** 同一天同 type 只保留最新一筆（不產生重複卡片）。 */
export function saveReflection(entry: Omit<ReflectionEntry, "id">): ReflectionEntry {
  const next: ReflectionEntry = { ...entry, id: genId() };
  const all = getReflections().filter(
    (r) => !(r.date === entry.date && r.type === entry.type)
  );
  all.unshift(next); // newest first
  try {
    localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(all));
  } catch {}
  return next;
}

/** 曾留下 Reflection 的不重複日期數 = 被點亮的夜晚。 */
export function getLitNightsCount(): number {
  return new Set(getReflections().map((r) => r.date)).size;
}
