"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { currentStage, nextStage, progress, type Stage } from "@/lib/starlight";
import type { Earned } from "@/lib/store";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function MoonlogCard({
  star,
  celebrate,
}: {
  star: number;
  celebrate?: Earned | null;
}) {
  const cur = currentStage(star);
  const nxt = nextStage(star);
  const pct = Math.round(progress(star) * 100);

  const [imgError, setImgError] = useState(false);
  const [display, setDisplay] = useState(star);
  const [glow, setGlow] = useState(false);
  const [grewNote, setGrewNote] = useState<Stage | null>(null);

  const prevStar = useRef(star);
  const mounted = useRef(false);

  const pulse = () => {
    setGlow(true);
    window.setTimeout(() => setGlow(false), 1400);
  };
  const showGrew = (stage: Stage) => {
    setGrewNote(stage);
    window.setTimeout(() => setGrewNote(null), 3200);
  };
  const countUp = (from: number, to: number) => {
    if (reduceMotion() || from === to) return setDisplay(to);
    const dur = 900;
    const start = performance.now();
    setDisplay(from);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setDisplay(Math.round(from + (to - from) * t));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // 進場：若剛從伸展賺到星光 → 數字跳動 + 光暈 +（若跨階）星球長大提示
  useEffect(() => {
    if (celebrate && celebrate.amount > 0) {
      countUp(Math.max(0, star - celebrate.amount), star);
      pulse();
      if (celebrate.grew) showGrew(cur);
    } else {
      setDisplay(star);
    }
    mounted.current = true;
    prevStar.current = star;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 之後在首頁即時增加（點亮今夜的小事）→ 輕輕回饋
  useEffect(() => {
    if (!mounted.current || star === prevStar.current) return;
    if (star > prevStar.current) {
      pulse();
      if (currentStage(star).stage !== currentStage(prevStar.current).stage) {
        showGrew(currentStage(star));
      }
    }
    setDisplay(star);
    prevStar.current = star;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [star]);

  return (
    <section
      className="rise animate-rise [animation-delay:180ms] relative rounded-card bg-moon-paper
                 border border-moon-mist/50 shadow-card p-2 pb-7"
      aria-label="我的月光星球"
    >
      <div className="relative flex justify-center pt-1.5">
        {imgError ? (
          <div className="relative w-[92%] aspect-square rounded-[1.6rem] bg-moon-paper
                          border border-dashed border-moon-mist flex items-center justify-center">
            <p className="text-xs text-moon-ink/40 text-center px-6">
              {cur.slug}
              <br />
              （素材尚未放入）
            </p>
          </div>
        ) : (
          <Image
            src={cur.art["2x"]}
            alt={`月光星球 — ${cur.rank}階段`}
            width={1080}
            height={1080}
            priority
            onError={() => setImgError(true)}
            className="relative w-[92%] h-auto rounded-[1.6rem] animate-float"
          />
        )}
        {/* 常駐光暈 — 圖片之後渲染，mix-blend-mode:screen 疊加在星球上 */}
        <div
          className="pointer-events-none absolute top-[48%] left-1/2 w-[78%] aspect-square
                     -translate-x-1/2 -translate-y-1/2 blur-[6px] animate-breathe"
          style={{
            background:
              "radial-gradient(circle, rgba(207,199,232,.55) 0%, rgba(207,199,232,0) 62%)",
            mixBlendMode: "screen",
          }}
        />
        {/* 獲得星光時的成長光暈 — 同上，screen 疊加 */}
        <div
          className="pointer-events-none absolute top-[48%] left-1/2 w-[92%] aspect-square
                     -translate-x-1/2 -translate-y-1/2 blur-[10px] transition-opacity duration-700"
          style={{
            opacity: glow ? 0.9 : 0,
            background:
              "radial-gradient(circle, rgba(201,221,234,.7) 0%, rgba(207,199,232,0) 60%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="px-6 text-center mt-1">
        <p className="font-serif text-[1.42rem] font-semibold tracking-wide">{cur.rank}</p>

        <div className="mt-2 flex items-baseline justify-center gap-1.5">
          <span className="text-moon-lav -translate-y-0.5">✦</span>
          <span className="font-fraunces text-[2.6rem] leading-none text-moon-ink">{display}</span>
          <span className="text-[0.78rem] tracking-widest text-moon-ink/40">星光</span>
        </div>

        <div className="mt-4 px-1">
          <div className="h-1 rounded-full bg-moon-mist/70 overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg,#C9DDEA,#CFC7E8)" }}
            />
          </div>
          <p className="mt-2.5 text-[0.74rem] tracking-[0.12em] text-moon-ink/40">
            {nxt ? (
              <>下一階段 · <b className="text-moon-ink/55 font-medium">{nxt.rank}</b></>
            ) : (
              <>夜空已經完整了 · <b className="text-moon-ink/55 font-medium">{cur.rank}</b></>
            )}
          </p>
        </div>

        {grewNote ? (
          <p className="mt-3 font-serif text-[0.82rem] text-moon-ink/55 animate-rise">
            ✦ 星球悄悄長大了 · 你成了「{grewNote.rank}」
          </p>
        ) : (
          <p className="mt-4 font-serif text-[0.85rem] leading-relaxed text-moon-ink/55 font-light">
            {cur.stage === 0 ? (
              <>一顆安靜的月光星球,<br />正等著被你慢慢點亮。</>
            ) : (
              cur.name
            )}
          </p>
        )}
      </div>
    </section>
  );
}
