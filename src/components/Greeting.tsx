"use client";
import { useEffect, useState } from "react";

const wd = ["日", "一", "二", "三", "四", "五", "六"];

export default function Greeting({ name = "Eileen" }: { name?: string }) {
  const [eyebrow, setEyebrow] = useState("");
  useEffect(() => {
    const d = new Date();
    setEyebrow(`${d.getMonth() + 1} 月 ${d.getDate()} 日 · 星期${wd[d.getDay()]}的夜晚`);
  }, []);

  return (
    <header className="rise animate-rise [animation-delay:50ms]">
      <p className="text-xs tracking-[0.2em] text-moon-ink/40">{eyebrow || "\u00a0"}</p>
      <h1 className="font-serif text-[1.92rem] font-semibold mt-2 tracking-tight">
        晚安,{name}
      </h1>
      <p className="mt-3 font-serif text-[0.95rem] leading-loose text-moon-ink/55 font-light">
        今天已經很努力了。
        <br />
        現在是你的時間。
      </p>
    </header>
  );
}
