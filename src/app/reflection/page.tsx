"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { pickReflectionSet, type ReflectionOption } from "@/lib/reflections";
import { saveReflection } from "@/lib/store";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function ReflectionPage() {
  const router = useRouter();
  const [options, setOptions] = useState<ReflectionOption[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setOptions(pickReflectionSet(3));
  }, []);

  const handleSave = () => {
    const opt = options.find((o) => o.id === selected);
    if (!opt) return;
    saveReflection({ date: todayISO(), type: "stretch", stars: 1, reflection: opt.text });
    setSaved(true);
    setTimeout(() => router.replace("/"), 1400);
  };

  const handleSkip = () => router.replace("/");

  return (
    <div className="w-full max-w-[25rem] min-h-dvh relative">
      <div className="px-6 pt-14 pb-10 flex flex-col min-h-dvh">

        {/* ── 星光確認 ── */}
        <p className="rise animate-rise text-xs tracking-[0.2em] text-moon-ink/40 text-center">
          ✦ 星光 +1
        </p>

        {/* ── 標題 ── */}
        <div className="rise animate-rise [animation-delay:80ms] mt-8 text-center">
          <h1 className="font-serif text-[1.7rem] font-semibold leading-snug">
            今晚哪一句
            <br />
            最像你？
          </h1>
          <p className="mt-2 font-serif font-light text-[0.85rem] text-moon-ink/50">
            把今晚留在月光裡。
          </p>
        </div>

        {/* ── 已儲存狀態 ── */}
        {saved ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-5">
            <p className="font-fraunces text-5xl text-moon-lav">✦</p>
            <p className="font-serif text-lg text-moon-ink/70 text-center leading-relaxed">
              這個夜晚，
              <br />
              已留在月光裡。
            </p>
            <p className="text-xs text-moon-ink/35 mt-1">正在回到你的星球⋯⋯</p>
          </div>
        ) : (
          <>
            {/* ── 句子選項 ── */}
            <div className="rise animate-rise [animation-delay:160ms] mt-10 flex flex-col gap-4">
              {options.map((opt, i) => {
                const active = selected === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelected(opt.id)}
                    className="w-full text-left rounded-card px-6 py-5
                               active:scale-[0.99] transition-all duration-200"
                    style={{
                      animationDelay: `${160 + i * 60}ms`,
                      background: active
                        ? "linear-gradient(155deg, rgba(201,221,234,.5), rgba(207,199,232,.5))"
                        : "rgba(252,252,250,1)",
                      border: `1.5px solid ${active ? "rgba(207,199,232,.8)" : "rgba(215,213,208,.6)"}`,
                      boxShadow: active
                        ? "0 4px 24px -8px rgba(207,199,232,.7), 0 0 0 3px rgba(207,199,232,.18)"
                        : "0 10px 30px -26px rgba(79,89,104,.4)",
                    }}
                  >
                    <span className="font-serif text-[1.05rem] leading-relaxed text-moon-ink">
                      「{opt.text}」
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── 操作按鈕 ── */}
            <div className="mt-auto pt-10 flex flex-col gap-3">
              <button
                onClick={handleSave}
                disabled={!selected}
                className="rise animate-rise [animation-delay:460ms] w-full rounded-soft py-4
                           font-medium transition-all duration-200
                           active:scale-[0.99] border"
                style={{
                  background: selected
                    ? "linear-gradient(155deg, rgba(201,221,234,.4), rgba(207,199,232,.4))"
                    : "transparent",
                  borderColor: selected ? "rgba(207,199,232,.6)" : "rgba(215,213,208,.5)",
                  color: selected ? "#4F5968" : "rgba(79,89,104,.35)",
                  cursor: selected ? "pointer" : "not-allowed",
                  boxShadow: selected ? "0 18px 50px -28px rgba(79,89,104,.45)" : "none",
                }}
              >
                留在月光裡
              </button>
              <button
                onClick={handleSkip}
                className="rise animate-rise [animation-delay:520ms] w-full py-3
                           font-serif font-light text-[0.82rem] text-moon-ink/35 tracking-wide"
              >
                讓靜謐代替一句話，今晚就留白吧
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
