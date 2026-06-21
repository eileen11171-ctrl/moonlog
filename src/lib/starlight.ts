import manifest from "../../public/illustrations/manifest.json";

export type Stage = {
  stage: number;
  min: number;
  rank: string;
  name: string;
  slug: string;
  art: { "1x": string; "2x": string };
};

export const stages: Stage[] = [...(manifest.stages as Stage[])].sort(
  (a, b) => a.min - b.min
);

export const transition = manifest.transition;

/** 目前符合星光值的最高階段 */
export function currentStage(star: number): Stage {
  let s = stages[0];
  for (const st of stages) if (star >= st.min) s = st;
  return s;
}

/** 下一個尚未達到的階段（已達頂則為 null） */
export function nextStage(star: number): Stage | null {
  return stages.find((st) => st.min > star) ?? null;
}

/** 朝下一階段的進度 0–1 */
export function progress(star: number): number {
  const cur = currentStage(star);
  const nxt = nextStage(star);
  if (!nxt) return 1;
  const span = nxt.min - cur.min;
  return span <= 0 ? 1 : Math.min(1, (star - cur.min) / span);
}
