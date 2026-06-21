export const universeQuotes = [
  "真正重要的事,往往是安靜的。",
  "慢慢來,星星也是一顆一顆亮起來的。",
  "今天沒完成也沒關係,月亮明天還是會升起。",
  "休息不是偷懶,是讓星光充電。",
  "你已經做得很好了,剩下的交給夜晚。",
  "宇宙很大,但今晚它只想對你溫柔。",
];

/** 依日期固定一句,同一天看到同一句 */
export function todayQuote(date = new Date()): string {
  const seed =
    date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate();
  return universeQuotes[seed % universeQuotes.length];
}
