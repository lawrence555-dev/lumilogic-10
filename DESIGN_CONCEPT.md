# LumiLogic 10：全方位開發與教育藍圖 (Master Design Spec v2.0)

> **"讓邏輯思維像光一樣，自然地照亮孩子的認知世界。"**

---

## 📖 目錄 (Table of Contents)
- [0. 專案背景與願景 (Project Vision)](#0-專案背景與願景-project-vision)
- [1. 教育架構：10 年長征路線圖 (Pedagogical Roadmap)](#1-教育架構10-年長征路線圖-pedagogical-roadmap)
- [2. 遊戲結構：月份與儀式感 (Game Structure)](#2-遊戲結構月份與儀式感-game-structure)
- [3. 進階機制：鎖定與解鎖 (Unlock Mechanics)](#3-進階機制鎖定與解鎖-unlock-mechanics)
- [4. 五大邏輯模組 (The Five Modules)](#4-五大邏輯模組-the-five-modules)
- [5. 技術實作與數據架構 (Technical & Data Spec)](#5-技術實作與數據架構-technical--data-spec)
- [6. 開發階段計畫 (Development Phases)](#6-開發階段計畫-development-phases)
- [7. 給家長的一封信 (A Letter to Parents)](#7-給家長的一封信-a-letter-to-parents)

---

## 0. 專案背景與願景 (Project Vision)

### 核心使命
透過 **Modern Web 技術** 與 **競賽數學 (AMC)** 的深度結合，建立一個具備「工程直覺」與「日式美學」的邏輯訓練場景。我們不只是在做遊戲，是在佈局一個長期的數學思維訓練路徑。

*   **目標對象**: 4 歲幼兒（啟蒙起步） ➝ 目標 10 年後挑戰 **AMC 10**。
*   **開發者**: 具備 10 年以上經驗的 **工程師爸爸**。
*   **為何這樣設計**: 
    1.  **建立耐性**: AMC 10 需要長時間思考。透過「一個月一個章節」的長線設計，從小培養持續努力的心理韌性。
    2.  **避免偏科**: 許多選手幾何強但代數弱。與其單點突破，不如透過五大模組平行進展，強迫大腦各區域同步成長。

---

## 1. 教育架構：10 年長征路線圖 (Pedagogical Roadmap)

| 階段 | 建議年齡 | 競賽目標 | 核心訓練重點 |
| :--- | :--- | :--- | :--- |
| **啟蒙期 (Phase 1)** | **4 - 6 歲** | **LumiLogic 10** | **具象數感**、空間旋轉、基本邏輯過濾。建立對數學的「好感度」。 |
| **初試期 (Phase 2)** | **7 - 9 歲** | **Math Kangaroo / ASMO** | **抽象邏輯轉換**、初步幾何計算、模式識別。開始接觸文字題的邏輯轉化。 |
| **進階期 (Phase 3)** | **10 - 12 歲** | **AMC 8 / SEAMO** | **數論基礎**、計數原理、邏輯推理題。強調解題速度與準確度。 |
| **目標期 (Phase 4)** | **13 - 16 歲** | **AMC 10 / AIME** | **複數幾何**、概率統計、代數與函數優化。訓練高強度的數學思維耐力。 |

---

## 2. 遊戲結構：月份與儀式感 (Game Structure)

我們不採用傳統的 Level 1-100，而是採用 **「月份章節 (Monthly Chapters)」** 的生活化結構。

### 📅 月份章節 (Monthly Chapters)
*   **概念**: 每個月份對應一個主題世界。例如「Chapter 1：森林啟蒙」、「Chapter 2：海洋探險」。
*   **集點卡 (The Stamp Card)**: 每個章節有一張 **20 格** 的大集點卡。目標不是一天玩完，而是「維持動力」。

### 🌞 每日任務 (Daily Quest)
*   **機制**: 系統每天從五大類別中隨機抽取 **2-3 題** 階段性任務。
*   **獎勵**: 完成當日任務，就能在集點卡上蓋一個大大的、有物理碰撞音效的「實體感印章」。

### 🏆 週末大挑戰 (Weekend BOSS)
*   **機制**: 每週六開放一個難度較高的「綜合題」。
*   **獎勵**: 解開後獲得稀有的「小屋裝飾零件」（例如：掛畫、地毯、盆栽）。

---

## 3. 進階機制：鎖定與解鎖 (Unlock Mechanics)

為了確保學習曲線循序漸進，我們設計了雙重門檻：

1.  **內部解鎖 (Skill Dependency)**
    *   在同一章節內，必須先玩過「空間 Easy-1」三次並全對，系統才會解鎖「空間 Easy-2」。
2.  **跨章節解鎖 (Chapter Graduation)**
    *   必須完成 Chapter 1 集點卡上 **80% 的印章**（代表五大能力平均達標），下個月的 Chapter 2 入口才會開啟。
3.  **重溫機制 (Review)**
    *   已經蓋過章的舊題目隨時可以重玩以訓練熟練度，但不會獲得新印章，只能獲得「小星星」。

---

## 4. 五大邏輯模組 (The Five Modules)

### A. 空間邏輯 (Spatial Reasoning)
*   **Easy-1 範例**: **視角連連看**。左側 3D 模型，右側選出對應的三視圖（上/前/側）。
*   **AMC 聯結**: 立體幾何體積、截面計算、圖形變換。

### B. 模式與序列 (Patterns & Sequences)
*   **Easy-1 範例**: **規律填空**。$A-B-A-B-...$ 下一個是？
*   **AMC 聯結**: 等差/等比數列、週期性問題、同餘理論。

### C. 邏輯與集合 (Logic & Sets)
*   **Easy-1 範例**: **單一條件篩選**。「選出所有紅色的積木」。
*   **AMC 聯結**: 集合論 (Set Theory)、容斥原理。

### D. 數感與對稱 (Number Sense)
*   **Easy-1 範例**: **物理天平**。左放 1 個大球，右放 5 個小球，觀察平衡。
*   **AMC 聯結**: 方程組思維、數論基礎。

### E. 算法與組合 (Algorithms & Counting)
*   **Easy-1 範例**: **路徑規劃**。小機器人 3 步內走到終點。
*   **AMC 聯結**: 排列組合、圖論基礎、遞迴。

---

## 5. 技術實作與數據架構 (Technical & Data Spec)

### 前端堆疊 (Front-end Stack)
*   **Framework**: Next.js 14 (App Router) + Tailwind CSS
*   **3D Engine**: React Three Fiber (R3F) + Drei (自建幾何組件，不使用外部大模型)
*   **State**: Zustand (輕量級狀態管理)
*   **Animation**: Framer Motion (UI 轉場)

### 跨裝置布局 (RWD Strategy)
*   **Aspect Ratio Boxing**: 主遊戲區塊固定 4:3。
*   **iPad Landscape**: 工具欄置於兩側，適合雙手握持。
*   **Mobile Portrait**: 下半部為拇指點擊區，上半部為視覺區。

### 數據庫設計 (Supabase Schema)
1.  **`chapters`**: 定義月份名稱、主題背景、解鎖門檻。
2.  **`tasks`**: 儲存題目生成參數，標記 `category` 與 `difficulty_score`。
3.  **`user_progress`**: 紀錄 `category_experience_points` (各類別經驗值)。

### 難度引擎 (Difficulty Engine)
*   **不寫死 Level**。當孩子在某類別經驗值達到閾值，系統自動從 Easy 轉向 Normal (Adaptive Difficulty)。
*   **爸爸後台控制**: 可手動設定「本月主題」，例如調高空間題出現頻率。

---

## 6. 開發階段計畫 (Development Phases)

### Phase 1: 基礎架構與核心 3D (Master Branch V1.0)
*   [ ] 初始化 Next.js + Tailwind。
*   [ ] 整合 R3F，建立「木質重心」3D 環境。
*   [ ] 實作支援 iPad 阻尼感 (Damping) 的 OrbitControls。
*   [ ] 實作 4:3 畫布容器化。

### Phase 2: 五大邏輯引擎 (Feature Branches)
*   [ ] **空間**: 視角投影與影子匹配。
*   [ ] **數感**: 物理天平系統 (5/10/20 以內)。
*   [ ] **邏輯**: 多重屬性篩選引擎。
*   [ ] **規律**: 序列生成器。
*   [ ] **算法**: 指令式迷宮。

### Phase 3: 儀式感獎勵系統 (Feature/Gamification)
*   [ ] **數位蓋章 UX**: 物理撞擊音效與動畫。
*   [ ] **集點卡系統**: 月份章節制介面。
*   [ ] **Lumi 小屋**: 裝飾模式 (放置獲得的獎勵)。

### Phase 4: 數據追蹤與父端面板 (Feature/Admin)
*   [ ] **Supabase 串接**。
*   [ ] **成長雷達圖**: 視覺化五大能力分佈。
*   [ ] **自動難度調節 (ELO)**。

---

## 7. 給家長的一封信 (A Letter to Parents)

### 為什麼選擇 LumiLogic？
*   **🌱 高品質的螢幕時間**: 反對無意義點擊，讓螢幕時間轉化為大腦健身。
*   **🛡️ 安全純淨**: 無廣告、無消費誘導。
*   **🧠 成長型思維**: 只有 "Not Yet"，沒有失敗。透過「一個月一章節」的長線設計，培養孩子面對困難挑戰的耐心與恆毅力 (Grit)。

---
> *LumiLogic 10 —— 工程師爸爸給下一代的思維禮物。*
