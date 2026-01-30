# 🛠️ LumiLogic 開發與協作規範 (SOP v2.1)

本文件定義了專案的標準開發流程。此流程參照專業軟體工程標準，確保代碼品質與穩定性。

---

## 1. 開發週期 (Feature Lifecycle)
(略，保持原樣)

## 2. 定義「完成」 (DoD)
(略，保持原樣)

## 3. 遊戲畫面規範 (Game Viewport Standard) - [NEW]

所有「遊戲關卡 (Level)」頁面必須遵循以下佈局規範：

### 3.1. 全螢幕純淨體驗 (Pure Fullscreen)
- **All Devices (Mobile/Tablet/Desktop)**: 採用 **完全全螢幕 (Pure Fullscreen)**。
- **無邊框**: 移除所有模擬框 (Device Frame)、圓角與陰影。
- **背景填滿**: 遊戲背景色應直接填滿整個視窗 (100dvh)，不留黑邊或白邊。
- **置中策略**: 核心互動區域保存在中央安全區，但在視覺上延伸至邊緣。

### 3.2. 強制橫向 (Force Landscape)
- 手機版 (Mobile) 必須強制轉向。
- 若偵測到直向 (Portrait)，顯示「請轉橫手機」的全版提示層。
- **實作方式**: 統一使用 `<GameContainer>` 包覆。

### 3.3. 統一抬頭顯示器 (Standard HUD)
- **唯一導航**: 僅由 `GameContainer` 提供左上角 **返回按鈕 (Back)**。
- 🚫 **禁止**: 關卡內部 (Level Component) 禁止自行實作返回或首頁按鈕，避免重複。

### 3.4. 響應式縮放策略 (Scaling Strategy)
- **Contain 模式**: 遊戲核心畫面應確保「完全顯示」於視窗內，避免裁切。
- **Auto-Scale**: 當視窗比例過扁 (Mobile Landscape) 時，應自動縮放 (Zoom Out) 或調整相機距離，確保上下重要內容不被切除。

---

## 4. Git 提交規範
(略，保持原樣)
