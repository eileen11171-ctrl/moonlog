"use client";

import { useEffect, useState } from "react";
import Greeting from "@/components/Greeting";
import MoonlogCard from "@/components/MoonlogCard";
import StretchEntryCard from "@/components/StretchEntryCard";
import TonightRituals, { type RitualKey } from "@/components/TonightRituals";
import UniverseMessage from "@/components/UniverseMessage";
import DailyKeyMemory from "@/components/DailyKeyMemory";
import TabBar from "@/components/TabBar";
import { getStar, setStar as persistStar, consumeEarned, type Earned } from "@/lib/store";

const todayKey = () => new Date().toISOString().slice(0, 10);
const emptyDone = (): Record<RitualKey, boolean> => ({ water: false, protein: false });

export default function Home() {
  const [star, setStarState] = useState(0);
  const [done, setDone] = useState<Record<RitualKey, boolean>>(emptyDone());
  const [ready, setReady] = useState(false);
  const [celebrate, setCelebrate] = useState<Earned | null>(null);

  // 進入首頁時讀取最新星光值（含 /stretch 完成後 +1）
  useEffect(() => {
    setStarState(getStar());
    setCelebrate(consumeEarned());
    try {
      const raw = localStorage.getItem("moonlog:rituals");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.date === todayKey()) setDone(parsed.done);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    persistStar(star);
    localStorage.setItem("moonlog:rituals", JSON.stringify({ date: todayKey(), done }));
  }, [star, done, ready]);

  const toggle = (k: RitualKey) => {
    setDone((d) => {
      const next = !d[k];
      setStarState((s) => Math.max(0, s + (next ? 1 : -1)));
      return { ...d, [k]: next };
    });
  };

  return (
    <div className="w-full max-w-[25rem] min-h-dvh relative">
      <div className="px-6 pt-9 pb-28 flex flex-col gap-7">
        <Greeting name="Eileen" />
        <MoonlogCard star={star} celebrate={celebrate} />
        <StretchEntryCard />
        <TonightRituals done={done} onToggle={toggle} />
        <UniverseMessage />
        <DailyKeyMemory />
        <p className="rise animate-rise [animation-delay:560ms] text-center text-xs text-moon-ink/40 tracking-wide">
          沒有全部完成也沒關係,月亮明天還是會升起
        </p>
      </div>
      <TabBar />
    </div>
  );
}
