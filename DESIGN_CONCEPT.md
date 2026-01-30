# LumiLogic 10 (光之邏輯) - 設計概念與開發白皮書

> **"讓邏輯思維像光一樣，自然地照亮孩子的認知世界。"**

---

## 1. 核心願景 (Core Vision)

LumiLogic 10 旨在打破傳統「教育軟體」枯燥乏味的刻板印象，透過 **「隱形學習 (Stealth Learning)」** 的設計哲學，打造一個讓 6-12 歲兒童（以及保有童心的大人）流連忘返的認知訓練場域。

我們的目標不是「教導」知識，而是喚醒使用者內在的**空間感**、**數感**與**邏輯直覺**。

---

## 2. 設計哲學 (Design Philosophy)

### 2.1 視覺語言：數位有機體 (Digital Organic)
我們拒絕冰冷的科技藍光或過度飽和的卡通配色。LumiLogic 採用 **「療癒系大地色調 (Healing Earth Tones)」**：
-   **色彩**: 鼠尾草綠 (Sage)、溫暖木色 (Wood)、柔和米白 (Bisque)。
-   **介面**: 按鈕不是死板的方塊，而是像鵝卵石般圓潤；路徑不是直線，而是如同森林小徑般的虛線軌跡。
-   **動效**: 所有互動都帶有物理慣性與彈性 (Spring Physics)，模擬真實世界的觸感。

### 2.2 互動體驗：直覺先行 (Intuition First)
-   **零文字門檻**: 遊戲引導依靠動態手勢與視覺暗示 (Affordance)，而非冗長的文字說明。
-   **3D 與 2D 的無縫融合**: 在 2D 的 UI 介面上疊加高品質的 3D 互動元素，創造出 "躍然紙上" 的驚喜感，同時保持操作的輕量與流暢。

---

## 3. 關卡設計架構 (Level Architecture)

遊戲依照人類認知發展階段（皮亞傑認知發展理論）設計，由具象到抽象層層遞進：

### **Chapter 1: The Forest (感官與直覺)**

*   **Level 1: Spatial (空間幾何)**
    *   **核心能力**: 心理旋轉 (Mental Rotation)、圖形辨識。
    *   **玩法**: 把玩懸浮的 3D 積木，透過觀察陰影與透視，將其嵌入對應的 2D 模具中。
    *   **技術亮點**: 使用 Raycasting 進行精準的點擊判定，以及 Quaternion 運算處理平滑旋轉。

*   **Level 2: Numbers (數感平衡)**
    *   **核心能力**: 守恆概念 (Conservation)、基礎加法運算、重量感知。
    *   **玩法**: 物理模擬的天平。玩家需將具備真實質量的松果放入籃子，直到與左側重量達成平衡。
    *   **技術亮點**: 整合 `Cannon.js` 物理引擎，模擬真實的重力、碰撞與力矩。透過 Ray-Plane Intersection 實現無視差的精準拖曳。

*   **Level 3: Logic (邏輯推演) [開發中]**
    *   **核心能力**: 條件判斷、序列推理。
    *   **玩法**: 連接電路或水管，通過 AND/OR 邏輯閘引導光流。

---

## 4. 技術架構 (Technical Stack)

LumiLogic 是一個 Modern Web 應用的極致展現，證明了瀏覽器也能運行 3A 級的互動體驗。

*   **核心框架**: [Next.js 14](https://nextjs.org/) (App Router) - 提供極速的首屏加載與路由體驗。
*   **3D 引擎**: [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber) - React 生態系中最強大的 WebGL 渲染器。
*   **物理引擎**: [@react-three/cannon](https://github.com/pmndrs/use-cannon) - 輕量級的高效物理模擬。
*   **動效系統**: [Framer Motion](https://www.framer.com/motion/) - 負責所有 UI 的進場、退場與轉場動畫。
*   **狀態管理**: React Hooks + LocalStorage Persistence (實現無伺服器的進度保存)。

---

## 5. 未來展望 (Roadmap)

1.  **適性化難度 AI (Adaptive AI)**: 根據玩家的解題速度與錯誤率，動態調整物理參數（如天平的容許誤差）或題目複雜度。
2.  **多人協作模式 (Co-op Mode)**: 允許兩名玩家在不同裝置上同時操作一個大型機關，訓練溝通與協作。
3.  **實體玩具連動 (Phygital Play)**: 透過 WebBluetooth 連接實體積木，將現實世界的操作映射到遊戲中。

---

> *LumiLogic 10 不僅僅是一個遊戲，它是給大腦的一場溫柔按摩，是科技與人文關懷的完美交匯。*
