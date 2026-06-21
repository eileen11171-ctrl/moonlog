# Moonlog 設計與素材說明

## 規格文件（外部交付，依版本保存）
- Art Bible v2.0 — Moonlog Universe（世界觀、七階段、素材架構與命名）
- 母版鎖定卡 v2.1 — 月光星球母版色票/構圖/各階段擺放/提示詞
- Moon Stretch 插圖規格書 v1 — 五動作插圖規範
- Moon Stretch 角色定妝照規格書 v1 — 「代表使用者自己的柔和身影」

ChatGPT 生成的製作參考母版（不進 App）建議放 design/refs/，例如：
- design/refs/stretch-character-ref.png

## 素材置換（drop-in，無需改程式）

### 月光星球七階段
丟進 public/illustrations/planet/，檔名：
planet-stage-{0..6}-{slug}@1x.webp / @2x.webp
slug: moonlit / rosebud / rosebloom / cat / lighthouse / beacon / boathome
未放入的階段 → 顯示紙感佔位框。

### 睡前伸展五動作
丟進 public/illustrations/exercise/，檔名：
exercise-01.webp ~ exercise-05.webp
未放入 → Stretch 頁顯示紙感 placeholder（不報錯）。
角色一致性依《Moon Stretch 角色定妝照規格書》。
