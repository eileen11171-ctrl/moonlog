"use client";
import { useEffect, useState } from "react";
import { todayQuote } from "@/lib/quotes";

export default function UniverseMessage() {
  const [q, setQ] = useState("");
  useEffect(() => setQ(todayQuote()), []);

  return (
    <section className="rise animate-rise [animation-delay:500ms]">
      <p className="text-xs tracking-[0.22em] text-moon-ink/40 mb-3.5 pl-0.5">
        今夜的宇宙訊息
      </p>
      <div
        className="rounded-soft border border-moon-mist/50 p-6"
        style={{
          background:
            "linear-gradient(160deg, rgba(201,221,234,.22), rgba(207,199,232,.16))",
        }}
      >
        <p className="font-serif text-[1.08rem] leading-loose">
          <span className="font-fraunces text-moon-lav tracking-[0.3em]">✦ </span>
          {q ? `「${q}」` : "\u00a0"}
        </p>
      </div>
    </section>
  );
}
