"use client";
import { useState } from "react";

// 圖存在 → 直接顯示；不存在 → 紙感 placeholder（不報錯）。
// 之後把 exercise-0X.webp 丟進 public/illustrations/exercise/ 即自動置換，無需改程式。
export default function ExerciseThumb({ src, name }: { src: string; name: string }) {
  const [err, setErr] = useState(false);
  const file = src.split("/").pop();

  if (err) {
    return (
      <div
        className="flex-none w-[4.5rem] h-[4.5rem] rounded-[1.1rem] bg-moon-paper
                   border border-dashed border-moon-mist flex flex-col items-center
                   justify-center gap-1"
        aria-label={`${name} 插圖待補`}
      >
        <span className="text-moon-lav/70 text-lg leading-none">✦</span>
        <span className="text-[9px] text-moon-ink/30">{file}</span>
      </div>
    );
  }
  // 用原生 img：缺檔時乾淨觸發 onError，不經過 next/image 最佳化器
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={name}
      width={72}
      height={72}
      onError={() => setErr(true)}
      className="flex-none w-[4.5rem] h-[4.5rem] rounded-[1.1rem] object-cover"
    />
  );
}
