# 月光日誌 Moonlog 🌙

溫柔的夜晚習慣 PWA。沒有連續打卡壓力,只有慢慢點亮的一顆月光星球。

## 啟動

```bash
npm install
npm run dev
```
開 http://localhost:3000

## 結構

```
public/
  illustrations/
    manifest.json          ← 七階段資料（唯一來源：稱號/門檻/圖檔路徑）
    planet/
      planet-stage-0-moonlit@1x.webp / @2x.webp   ← 母版（已放入）
      （其餘 1–6 階段生成後依命名放入即可）
  icons/                   ← PWA 圖示
  manifest.json            ← PWA manifest
src/
  app/
    layout.tsx  globals.css  page.tsx（首頁）
  components/
    Greeting.tsx  MoonlogCard.tsx  TonightRituals.tsx
    UniverseMessage.tsx  TabBar.tsx
  lib/
    starlight.ts           ← 讀 manifest、依星光值算階段/進度
    quotes.ts              ← 今日宇宙訊息
```

## 新增星球階段（之後）
1. 用 ChatGPT 依母版鎖定卡生成該階段圖
2. 去背/輸出成 `planet-stage-{n}-{slug}@2x.webp`（及 @1x）
3. 丟進 `public/illustrations/planet/`
程式會自動讀 manifest 顯示，未放入的階段會顯示佔位框、不會壞掉。

## 部署 Vercel
推上 GitHub → Vercel 匯入 → Deploy（零設定）。
日後接 Supabase 時，於 Vercel 環境變數加入：
NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY

## 目前進度
- [x] 正式 Next.js 專案 + Tailwind 主題（鎖定色票）
- [x] 首頁：晚安問候 / MoonlogCard（母版星球）/ 今夜三件小事 / 今日宇宙訊息
- [x] starlight 系統（讀 manifest，零連續登入壓力）
- [x] PWA 可加入主畫面
- [ ] 星球階段 1–6 素材
- [ ] Supabase 雲端儲存
- [ ] 日誌頁
