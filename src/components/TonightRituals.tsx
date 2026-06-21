"use client";

export type RitualKey = "water" | "protein";

const RITUALS: { key: RitualKey; title: string; hint: string }[] = [
  { key: "water", title: "補充水分", hint: "喝足夠的水，像澆灌今天的自己" },
  { key: "protein", title: "補充蛋白質", hint: "吃身體需要的食物，組成更好的你" },
];

export default function TonightRituals({
  done,
  onToggle,
}: {
  done: Record<RitualKey, boolean>;
  onToggle: (k: RitualKey) => void;
}) {
  return (
    <section className="rise animate-rise [animation-delay:380ms]">
      <p className="text-xs tracking-[0.22em] text-moon-ink/40 mb-3.5 pl-0.5">今夜的小事</p>
      <div className="rounded-soft bg-moon-paper border border-moon-mist/50 shadow-group overflow-hidden">
        {RITUALS.map((r, i) => {
          const lit = done[r.key];
          return (
            <button
              key={r.key}
              onClick={() => onToggle(r.key)}
              aria-pressed={lit}
              className={`flex items-center gap-4 w-full text-left px-5 py-[1.05rem]
                          focus-visible:outline focus-visible:outline-2 focus-visible:outline-moon-lav
                          ${i > 0 ? "border-t border-moon-mist/45" : ""}`}
            >
              <span
                className={`flex-none w-[1.9rem] h-[1.9rem] rounded-full flex items-center
                            justify-center text-[0.85rem] transition-all duration-300
                            ${
                              lit
                                ? "border border-moon-lav bg-moon-lav text-moon-ink shadow-[0_0_0_6px_rgba(207,199,232,0.22)]"
                                : "border-[1.5px] border-moon-mist text-transparent"
                            }`}
              >
                ✦
              </span>
              <span className="flex-1">
                <span className={`block text-base transition-colors ${lit ? "text-moon-ink/55" : "text-moon-ink"}`}>
                  {r.title}
                </span>
                <span className="block text-[0.76rem] text-moon-ink/40 mt-0.5">
                  {lit ? "已點亮 ✦" : r.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
