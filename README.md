# LumiLogic 10 (光之邏輯 10)

歡迎來到 **LumiLogic 10**！這是一個結合 **Next.js 14+**、**React Three Fiber (R3F)** 與 **Tailwind CSS** 的互動式邏輯訓練與冒險平台。

> 📖 **[閱讀設計概念與開發白皮書 (Design Concept)](./DESIGN_CONCEPT.md)** - 了解我們的設計哲學、競賽亮點與未來藍圖。

## 🌟 專案特色

### 1. 🌲 沉浸式森林地圖 (Forest Hub)
進入一個充滿日式極簡風格的森林世界。
- **有機路徑**: 動態呼吸的虛線路徑，引導你的學習旅程。
- **分層視覺**: 精緻的 SVG 山巒與樹影背景，營造深度感。
- **自動存檔**: 內建 LocalStorage 存檔機制，你的探索進度（成就印章）會被永久保存。

### 2. 🧊 空間推理挑戰 (The Shadow Detective)
第一章的核心挑戰 —— 透過 3D 視角解謎。
- **3D 互動**: 旋轉懸浮的木質積木，尋找正確的對齊角度。
- **即時回饋**: 透過 "冷/熱" 視覺提示（邊框顏色與發光強度）引導你找到目標。
- **零文字教學**: 直覺的自動演示與手勢提示，讓遊戲玩法一目瞭然。

### 3. ⚖️ 數感平衡 (The Forest Balance)
第二章的核心挑戰 —— 結合物理模擬的直覺數學。
- **真實物理**: 整合 Cannon.js 引擎，每一顆松果都擁有真實的質量與碰撞體積。
- **無縫互動**: 獨家的 Ray-Plane 演算法，讓拖曳操作如磁鐵般精準吸附，消除 3D 空間的視差。
- **隱形教學**: 沒有數學公式，只有直覺的天平與重量，讓孩子自然體會「守恆」與「加法」的概念。

### 4. 📘 冒險護照系統 (Lumi Passport)
記錄你成就的數位護照。
- **擬真翻頁**: 使用 CSS 3D Transforms 打造真實的書籍翻頁體驗。
- **成就印章**: 完成關卡後解鎖精美的幾何印章。
- **無縫導航**: 經過嚴格測試的流暢翻頁邏輯，確保最佳的使用者體驗。

## 🛠️ 技術堆疊

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **語言**: TypeScript
- **3D 渲染**: @react-three/fiber, @react-three/drei
- **樣式**: Tailwind CSS
- **動畫**: Framer Motion
- **圖標**: Phosphor Icons

## 🚀 快速開始

1.  **安裝依賴**:
    ```bash
    npm install
    ```

2.  **啟動開發伺服器**:
    ```bash
    npm run dev
    ```

3.  **開啟瀏覽器**:
    前往 [http://localhost:3000](http://localhost:3000) 開始冒險！

## 📄 授權

MIT License
