"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { stretchCourse } from "@/lib/stretch";
import { isStretchDoneToday } from "@/lib/store";

export default function StretchEntryCard() {
  const [done, setDone] = useState(false);
  useEffect(() => setDone(isStretchDoneToday()), []);

  return (
    <Link
      href="/stretch"
      className="rise animate-rise [animation-delay:260ms] block rounded-card border border-moon-mist/50
                 shadow-card p-5 active:scale-[0.99] transition-transform"
      style={{ background: "linear-gradient(155deg, rgba(201,221,234,.28), rgba(207,199,232,.22))" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-serif text-[1.18rem] font-semibold flex items-center gap-2">
            <span aria-hidden>🌙</span> {stretchCourse.title}
          </p>
          <p className="mt-1.5 text-[0.8rem] text-moon-ink/55 tracking-wide">
            {stretchCourse.duration}
          </p>
          <p className="mt-0.5 text-[0.8rem] text-moon-ink/55">
            雕塑:{stretchCourse.focus}
          </p>
        </div>
      </div>
      <p className={`mt-4 text-sm font-medium ${done ? "text-moon-ink/45" : "text-moon-ink"}`}>
        {done ? "今晚已完成 ✦" : "開始 →"}
      </p>
    </Link>
  );
}
