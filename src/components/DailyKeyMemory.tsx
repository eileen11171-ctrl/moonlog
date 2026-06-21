"use client";

import { useEffect, useState } from "react";
import { getTodayMemory, saveDailyMemory } from "@/lib/dailyMemory";

const MAX_LENGTH = 120;

export default function DailyKeyMemory() {
  const [text, setText] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  // 載入今天已有的記憶（若有）
  useEffect(() => {
    const existing = getTodayMemory();
    if (existing) setText(existing);
  }, []);

  const handleSave = () => {
    if (!text.trim()) return;
    saveDailyMemory(text);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const hasText = text.trim().length > 0;

  return (
    <section className="rise animate-rise [animation-delay:530ms]">
      <p className="text-xs tracking-[0.22em] text-moon-ink/40 mb-3.5 pl-0.5">
        Daily Key Memory
      </p>
      <div className="rounded-soft bg-moon-paper border border-moon-mist/50 shadow-group px-5 pt-5 pb-4">
        <p className="font-serif text-[0.85rem] text-moon-ink/55 mb-4">
          今天，你想記住什麼？
        </p>

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setJustSaved(false);
          }}
          maxLength={MAX_LENGTH}
          placeholder="今天發生了什麼？留一句給今天。"
          rows={3}
          className="w-full resize-none bg-transparent font-serif text-[0.95rem]
                     text-moon-ink leading-relaxed
                     placeholder:text-moon-ink/25 placeholder:font-serif
                     focus:outline-none
                     border-b border-moon-mist/50 pb-3 mb-4"
        />

        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] text-moon-ink/30 font-light tabular-nums">
            {text.length} / {MAX_LENGTH}
          </span>
          <button
            onClick={handleSave}
            disabled={!hasText}
            className="text-[0.82rem] tracking-wide transition-all duration-200
                       px-4 py-1.5 rounded-full border"
            style={{
              background: hasText
                ? "linear-gradient(155deg, rgba(201,221,234,.4), rgba(207,199,232,.4))"
                : "transparent",
              borderColor: hasText
                ? "rgba(207,199,232,.6)"
                : "rgba(215,213,208,.5)",
              color: hasText ? "#4F5968" : "rgba(79,89,104,.35)",
              cursor: hasText ? "pointer" : "not-allowed",
            }}
          >
            {justSaved ? "已留下 ✦" : "留下月光"}
          </button>
        </div>
      </div>
    </section>
  );
}
