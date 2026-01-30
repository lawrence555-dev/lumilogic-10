# 🛠️ LumiLogic 開發與協作規範 (SOP v2.0)

本文件定義了專案的標準開發流程。此流程參照專業軟體工程標準，確保代碼品質與穩定性。

---

## 1. 開發週期 (Feature Lifecycle) - 完整版

### 階段一：規格確認 (Spec & Design)
- **Check**: 閱讀 `DESIGN_CONCEPT.md`。
- **Plan**: 在 `implementation_plan.md` 中撰寫技術規劃（包含資料庫 Schema 異動）。
- **Approval**: **[關鍵] 必須獲得 User (Tech Lead) 的規劃核可才可開始寫 Code。**

### 階段二：獨立分支 (Branching)
- 命名：`feature/功能名稱` 或 `fix/Bug描述`。
- 嚴禁直接 Commit 到 `main`。

### 階段三：實作與靜態檢查 (Development & Static Analysis)
- 撰寫代碼。
- **[關鍵] 提交前必須通過以下自動化檢查：**
  1.  `npm run lint` (ESLint 檢查)
  2.  `npm run type-check` (TypeScript 類型檢查, 若有)
  3.  `npm run build` (確保 Production Build 不會爆掉)

### 階段四：自測與報告 (QA & Reporting)
- 產出測試報告 (`REPORTS/{日期}_{功能}.md`)。
- 報告必須包含：
  -  **功能驗證** (Happy Path)
  -  **邊界測試** (Edge Cases)
  -  **相容性測試** (Mobile/Desktop/Safari)

### 階段五：代碼審查與合併 (Code Review & Merge)
- **Review**: 通知 User 進行代碼審查 (`notify_user`)。
- **Approval**: User 確認無誤後，才執行 Merge。
- **Squash & Merge**: 保持 Git History乾淨。

---

## 2. 定義「完成」 (Definition of Done - DoD)

一個 Feature 被視為「完成」，必須滿足：
1.  [ ] 所有 Unit Test / E2E Test 通過（若有）。
2.  [ ] `npm run build` 成功無誤。
3.  [ ] 測試報告 (`REPORTS/`) 已歸檔。
4.  [ ] UI 符合「日式極簡」美學標準。
5.  [ ] 沒有遺留任何 `console.log` 或註解掉的死代碼。

---

## 3. Git 提交規範 (Conventional Commits)

使用 **繁體中文**，格式：`[類型]: 標題`

| 標籤 | 意義 |
| :--- | :--- |
| **[功能]** | (Feat) 新增功能 |
| **[修復]** | (Fix) 修復 Bug |
| **[重構]** | (Refactor) 不影響功能的代碼重組 |
| **[效能]** | (Perf) 提升效能 |
| **[樣式]** | (Style) 僅調整 CSS/UI |
| **[文件]** | (Docs) 文件變更 |
| **[建構]** | (Build) 依賴庫或構建工具調整 |

---

## 4. 資料庫變更規範 (Database Migration)
*(適用於 Phase 4 Supabase 導入後)*
- 所有的 Schema 變更必須記錄在 `supabase/migrations`。
- 禁止手動在 Production Console 修改 Schema。

---

> *高品質的軟體，源自於對流程的堅持。*
