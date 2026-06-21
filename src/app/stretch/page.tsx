"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { stretchCourse } from "@/lib/stretch";
import ExerciseThumb from "@/components/ExerciseThumb";
import { addStar, getStar, isStretchDoneToday, setStretchDoneToday, setEarned } from "@/lib/store";
import { currentStage } from "@/lib/starlight";

export default function StretchPage() {
  const router = useRouter();
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [justDone, setJustDone] = useState(false);

  useEffect(() => setAlreadyDone(isStretchDoneToday()), []);

  const complete = () => {
    const first = !isStretchDoneToday();
    if (first) {
      const before = getStar();
      addStar(1);
      const after = getStar();
      const grew = currentStage(after).stage !== currentStage(before).stage;
      setStretchDoneToday(true);
      setEarned(1, grew); // 讓首頁播放「星光 +1 / 星球成長」回饋
    }
    setJustDone(true);
    setTimeout(() => router.push("/reflection"), 1200);
  };

  return (
    <div className="w-full max-w-[25rem] min-h-dvh relative">
      <div className="px-6 pt-7 pb-32 flex flex-col gap-6">
        <Link href="/" className="text-[0.8rem] tracking-wide text-moon-ink/45 w-fit">
          ← 今夜
        </Link>

        <header className="rise animate-rise [animation-delay:40ms]">
          <p className="text-xs tracking-[0.2em] text-moon-ink/40">睡前儀式</p>
          <h1 className="font-serif text-[1.7rem] font-semibold mt-2">{stretchCourse.title}</h1>
          <p className="mt-2 text-[0.85rem] text-moon-ink/55">{stretchCourse.duration} · 5 個小動作</p>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-moon-ink/55 font-light">
            {stretchCourse.intro}
          </p>
        </header>

        <section className="flex flex-col gap-3">
          {stretchCourse.moves.map((m, i) => (
            <div
              key={m.id}
              className="rise animate-rise flex items-center gap-4 rounded-soft bg-moon-paper
                         border border-moon-mist/50 shadow-group p-3.5"
              style={{ animationDelay: `${120 + i * 70}ms` }}
            >
              <ExerciseThumb src={m.art} name={m.name} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-fraunces text-moon-ink/30 text-sm">{m.id}</span>
                  <span className="font-serif text-[1.05rem] font-semibold">{m.name}</span>
                </div>
                <p className="text-[0.78rem] text-moon-ink/45 mt-0.5">{m.count}</p>
                <p className="text-[0.78rem] text-moon-ink/45 mt-1 leading-relaxed font-light">{m.note}</p>
              </div>
            </div>
          ))}
        </section>

        <button
          onClick={complete}
          className="rise animate-rise [animation-delay:520ms] mt-2 w-full rounded-soft py-4
                     font-medium text-moon-ink border border-moon-lav/60 shadow-card
                     active:scale-[0.99] transition-transform"
          style={{ background: "linear-gradient(155deg, rgba(201,221,234,.4), rgba(207,199,232,.4))" }}
        >
          {alreadyDone ? "今晚已經完成了 · 回今夜" : "完成今日伸展"}
        </button>
        <p className="text-center text-xs text-moon-ink/35 tracking-wide">
          做一兩個也很好,身體會記得你的溫柔
        </p>
      </div>

      {justDone && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3"
          style={{ background: "rgba(250,248,243,.92)", backdropFilter: "blur(4px)" }}
        >
          <p className="font-fraunces text-5xl text-moon-ink">✦ +1</p>
          <p className="font-serif text-lg text-moon-ink/70">
            {alreadyDone ? "今晚也照顧好自己了" : "星光 +1,今晚也照顧好自己了"}
          </p>
          <p className="text-xs text-moon-ink/40 mt-1">正在回到你的星球⋯⋯</p>
        </div>
      )}
    </div>
  );
}
