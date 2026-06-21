export type StretchMove = {
  id: string;
  name: string;
  count: string;
  note: string; // 溫柔的作用說明，非醫療口吻
  art: string;
};

export const stretchCourse = {
  title: "今晚的月光伸展",
  duration: "5 分鐘",
  focus: "小腹 × 大腿 × 手臂",
  intro: "洗好澡了嗎?接下來五分鐘,把今天慢慢放下。",
  moves: [
    { id: "01", name: "貓式伸展", count: "30 秒", note: "像貓一樣,把今天的緊繃輕輕拱出去", art: "/illustrations/exercise/exercise-01.webp" },
    { id: "02", name: "橋式", count: "15 下", note: "把小腹和大腿,溫柔地喚醒", art: "/illustrations/exercise/exercise-02.webp" },
    { id: "03", name: "側躺抬腿", count: "左右各 15 下", note: "一邊一邊來,不用急", art: "/illustrations/exercise/exercise-03.webp" },
    { id: "04", name: "仰躺抬腿", count: "15 下", note: "讓小腹微微出力,呼吸別憋著", art: "/illustrations/exercise/exercise-04.webp" },
    { id: "05", name: "腹式呼吸", count: "1 分鐘", note: "最後,把自己交給呼吸和夜晚", art: "/illustrations/exercise/exercise-05.webp" },
  ] as StretchMove[],
};
