"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 今夜 → /        (active)
// 日誌 → /log     (Phase 2A 新增)
// 我的 → 佔位，暫無路由（Phase 1 已定案）
const TABS = [
  { label: "今夜", href: "/" },
  { label: "日誌", href: "/log" },
  { label: "我的", href: null },   // null = 佔位，不可點
] as const;

export default function TabBar() {
  const pathname = usePathname();

  // /log/* → 日誌 active；/ 或 /stretch → 今夜 active
  const active = pathname.startsWith("/log") ? "/log" : "/";

  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[25rem] flex justify-around
                 pt-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom))] backdrop-blur"
      style={{
        background: "linear-gradient(to top, #FAF8F3 70%, rgba(250,248,243,0))",
      }}
    >
      {TABS.map((t) => {
        const isActive = t.href !== null && active === t.href;
        const inner = (
          <>
            <span className={`w-1 h-1 rounded-full ${isActive ? "bg-moon-lav" : "bg-transparent"}`} />
            {t.label}
          </>
        );

        if (t.href === null) {
          // 佔位 tab：不可點，視覺與舊版一致
          return (
            <button
              key={t.label}
              disabled
              className="flex flex-col items-center gap-1 text-xs tracking-wider text-moon-ink/40"
              aria-disabled="true"
            >
              <span className="w-1 h-1 rounded-full bg-transparent" />
              {t.label}
            </button>
          );
        }

        return (
          <Link
            key={t.label}
            href={t.href}
            className={`flex flex-col items-center gap-1 text-xs tracking-wider
              ${isActive ? "text-moon-ink" : "text-moon-ink/40"}`}
            aria-current={isActive ? "page" : undefined}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
