# 🛠️ LumiLogic 開發與協作規範 (SOP v2.2)

本文件定義了專案的標準開發流程。此流程參照專業軟體工程標準，確保代碼品質與穩定性。

---

## 1. 開發週期 (Feature Lifecycle)

每個功能的開發必須遵循以下三個階段：

### Phase 1: Planning (規劃)
- **確認需求**: 閱讀 User Story 或 Issue。
- **更新任務**: 在 `task.md` 中拆解子任務。
- **撰寫計畫**: 對於複雜功能，先建立 `implementation_plan.md`。

### Phase 2: Execution (執行)
- **UI 先行**: 優先實作介面與視覺回饋。
- **邏輯實作**: 串接資料與邏輯。
- **代碼品質**: 保持代碼簡潔 (Clean Code)，遵守 ESLint 規範。

### Phase 3: Verification (驗證)
- **自我檢查**: 確認功能符合原始需求。
- **更新文件**: 更新 `walkthrough.md` 記錄成果。
- **通知用戶**: 使用 `notify_user` 提交成果。

---

## 2. 定義「完成」 (DoD - Definition of Done)
1.  **功能正常**: 通過所有預定的使用情境。
2.  **無錯誤**: `npm run dev` 無報錯，Console 無嚴重紅字。
3.  **UI 標準**: 符合 Design System (UI/UX Pro Max) 規範。
4.  **文件更新**: `task.md` 與 `walkthrough.md` 已同步更新。

---

## 3. 遊戲畫面規範 (Game Viewport Standard)

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

所有 Commit Message 必須遵循以下格式：

`[類型]: 簡短描述 (50字以內)`

### 4.1. 常用類型 (Types)
- **[功能]**: 新增功能 (feat)
- **[修復]**: 修補 Bug (fix)
- **[文件]**: 僅修改文件 (docs)
- **[樣式]**: 不影響邏輯的代碼排版或 UI 調整 (style/ui)
- **[重構]**: 代碼重構，無新功能 (refactor)
- **[優化]**: 提升效能 (perf)

### 4.2. 範例
- ✅ `[功能]: 實作月份集點卡 UI`
- ✅ `[修復]: 修正 Spatial 關卡圓角問題`
- ✅ `[文件]: 更新 WORKFLOW.md`
- ❌ `Added new feature` (未標示類型)
- ❌ `feat: update UI` (請使用中文方括號格式)
