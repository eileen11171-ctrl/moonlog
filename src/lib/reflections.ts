/**
 * Moon Reflection 句子資料庫（Phase 2B）
 * REFLECTIONS 是唯一資料來源，新增或調整句子只改此陣列。
 *
 * 情緒池 category：
 *   calm       平靜
 *   tired      疲憊
 *   companion  陪伴
 *   hope       希望
 *   moonlight  月光
 *
 * 設計原則：不過度勵志、不稱讚、不解釋情緒；
 * 只是安靜地站在使用者旁邊。
 */

export type ReflectionCategory =
  | "calm"
  | "tired"
  | "companion"
  | "hope"
  | "moonlight";

export interface ReflectionOption {
  id: string;
  category: ReflectionCategory;
  text: string;
}

export const REFLECTIONS: ReflectionOption[] = [
  // ── calm 平靜 ──────────────────────────────────────────────────
  { id: "r01", category: "calm",      text: "平凡的一天，也值得被記住。" },
  { id: "r04", category: "calm",      text: "什麼都沒做，也沒關係。" },
  { id: "r10", category: "calm",      text: "不完美的一天，也是完整的一天。" },
  { id: "r13", category: "calm",      text: "輕輕的，我把今天放下了。" },

  // ── tired 疲憊 ─────────────────────────────────────────────────
  // r03 邊緣觀察：重新定框感略強，下版建議替換
  { id: "r03", category: "tired",     text: "疲憊也是一種努力的痕跡。" },
  { id: "r07", category: "tired",     text: "明天不一定更好，但今晚可以先休息。" },
  { id: "r14", category: "tired",     text: "好好睡，是今晚最重要的事。" },
  { id: "r16", category: "tired",     text: "有些事還沒解決，但今晚可以等。" },

  // ── companion 陪伴 ─────────────────────────────────────────────
  { id: "r02", category: "companion", text: "今晚，我輕輕地照顧了自己。" },
  { id: "r12", category: "companion", text: "今晚我讓身體說了話。" },
  { id: "r18", category: "companion", text: "身體記住了今晚的溫柔。" },

  // ── hope 希望 ──────────────────────────────────────────────────
  { id: "r11", category: "hope",      text: "星光很小，但它在。" },
  { id: "r19", category: "hope",      text: "不知道為什麼，今晚好像輕了一些。" },
  { id: "r20", category: "hope",      text: "也許明天會有一點點不一樣。" },

  // ── moonlight 月光 ─────────────────────────────────────────────
  { id: "r06", category: "moonlight", text: "月光下，一切都靜了下來。" },
  { id: "r09", category: "moonlight", text: "這一刻屬於我。" },
  { id: "r21", category: "moonlight", text: "夜晚很長，但不是孤獨的。" },

  // ── 已移除（保留 id 避免重複） ────────────────────────────────
  // r05: 今天的我，已經夠了。          ← 心靈雞湯
  // r08: 慢慢地，我在學習善待自己。    ← 心靈雞湯
  // r15: 我不需要很厲害，只需要在。    ← 格言體
  // r17: 謝謝自己，沒有放棄今天。      ← 過度稱讚
];

/**
 * 先隨機選定一個情緒池，再從該池抽 count 句（預設 3）。
 * 同批句子來自同一情緒底色，確保世界觀一致。
 */
export function pickReflectionSet(count = 3): ReflectionOption[] {
  const cats: ReflectionCategory[] = [
    "calm", "tired", "companion", "hope", "moonlight",
  ];
  const cat = cats[Math.floor(Math.random() * cats.length)];
  const pool = REFLECTIONS.filter((r) => r.category === cat);
  // Fisher-Yates（操作副本，不汙染原陣列）
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/** @deprecated 使用 pickReflectionSet()。保留此介面避免舊 import 報錯。 */
export function pickReflections(count = 3): ReflectionOption[] {
  return pickReflectionSet(count);
}
