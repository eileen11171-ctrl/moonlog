"use client";

import { useEffect, useState } from "react";
import TabBar from "@/components/TabBar";
import { getStar, getReflections, getLitNightsCount, type ReflectionEntry } from "@/lib/store";
import { getDailyMemories, type DailyMemoryEntry } from "@/lib/dailyMemory";

function fmtDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${parseInt(m, 10)} 月 ${parseInt(d, 10)} 日`;
}

export default function LogPage() {
  const [stars, setStars] = useState(0);
  const [nights, setNights] = useState(0);
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [memoryMap, setMemoryMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    setStars(getStar());
    setNights(getLitNightsCount());
    setEntries(getReflections());
    const mems = getDailyMemories();
    setMemoryMap(new Map(mems.map((m: DailyMemoryEntry) => [m.date, m.text])));
  }, []);

  return (
    <div className="w-full max-w-[25rem] min-h-dvh relative">
      <div className="px-6 pt-10 pb-32 flex flex-col gap-7">

        {/* ── 頁首 ── */}
        <header className="rise animate-rise [animation-delay:50ms]">
          <p className="text-xs tracking-[0.2em] text-moon-ink/40">你的月光記錄</p>
          <h1 className="font-serif text-[1.7rem] font-semibold mt-2 leading-snug">
            那些被點亮的夜晚
          </h1>
          <p className="mt-3 font-serif text-[0.85rem] leading-loose text-moon-ink/55 font-light">
            每一點星光，都來自你照顧自己的時刻。
          </p>
        </header>

        {/* ── 統計卡 ── */}
        <div
          className="rise animate-rise [animation-delay:180ms] rounded-card border border-moon-mist/50
                     shadow-card overflow-hidden flex"
          style={{ background: "linear-gradient(155deg, rgba(201,221,234,.22), rgba(207,199,232,.16))" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <div className="flex items-baseline gap-1">
              <span className="text-moon-lav -translate-y-0.5">✦</span>
              <span className="font-fraunces text-[2.2rem] leading-none text-moon-ink">{stars}</span>
            </div>
            <p className="mt-1.5 text-[0.72rem] tracking-[0.14em] text-moon-ink/40">月光累積至今</p>
          </div>
          <div className="w-px bg-moon-mist/50 my-5" />
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <span className="font-fraunces text-[2.2rem] leading-none text-moon-ink">{nights}</span>
            <p className="mt-1.5 text-[0.72rem] tracking-[0.14em] text-moon-ink/40">被點亮的夜晚</p>
          </div>
        </div>

        {/* ── 紀錄列表 or 空狀態 ── */}
        {entries.length === 0 ? (
          <div className="rise animate-rise [animation-delay:300ms] flex flex-col items-center
                          justify-center pt-16 gap-4 text-center">
            <p className="font-fraunces text-4xl text-moon-lav/40">✦</p>
            <p className="text-[0.85rem] text-moon-ink/40 leading-loose font-light">
              完成第一次月光伸展，
              <br />
              今晚就會出現在這裡。
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {entries.map((e, i) => (
              <article
                key={e.id}
                className="rise animate-rise rounded-soft border border-moon-mist/50
                           shadow-group px-6 py-5"
                style={{
                  animationDelay: `${260 + i * 60}ms`,
                  background: "rgba(252,252,250,1)",
                }}
              >
                <p className="text-[0.72rem] tracking-[0.16em] text-moon-ink/35 mb-3">
                  {fmtDate(e.date)}
                </p>
                <p className="font-serif text-[1.05rem] leading-relaxed text-moon-ink">
                  「{e.reflection}」
                </p>
                <p className="mt-3 font-fraunces text-[0.76rem] text-moon-lav tracking-wide">
                  ✦ +{e.stars}
                </p>
                {memoryMap.get(e.date) && (
                  <div className="mt-3 pt-3 border-t border-moon-mist/40">
                    <p className="text-[0.7rem] tracking-[0.14em] text-moon-ink/35 mb-1.5">
                      Daily Memory
                    </p>
                    <p className="font-serif text-[0.88rem] leading-relaxed text-moon-ink/65">
                      {memoryMap.get(e.date)}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

      </div>
      <TabBar />
    </div>
  );
}
