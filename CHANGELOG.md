# 更新日誌

## 2024-12-05 - 專業語法高亮

### 🎨 重大視覺升級

**使用 Prism.js 語法高亮**:
- ✨ VS Code Dark+ 主題風格
- ✨ 專業的程式碼配色
- ✨ 深色背景，保護眼睛
- ✨ 清晰的語法顏色區分

### 🎯 語法高亮特色

**顏色方案**:
- 註解: 灰色 (#5c6370)
- 字串: 綠色 (#98c379)
- 關鍵字: 紫色 (#c678dd)
- 函數: 藍色 (#61afef)
- 數字: 橘色 (#d19a66)
- 變數: 紅色 (#e06c75)
- 運算符: 青色 (#56b6c2)

**UI 改進**:
- 深色程式碼區塊 (#282c34)
- 優雅的標題列設計
- 代碼圖標 `{ }` 前綴
- 改進的複製按鈕樣式
- 陰影和圓角效果

### 📦 技術實現

- **函式庫**: Prism.js v1.29.0
- **主題**: Tomorrow Night 變體
- **覆蓋範圍**: 所有 9 個頁面
- **程式碼區塊**: 29+ 個
- **體積**: ~4KB (gzipped)

### 🔧 更新內容

- ✅ 所有頁面添加 Prism.js
- ✅ 自訂 CSS 配色
- ✅ 優化程式碼區塊樣式
- ✅ 改進複製按鈕視覺效果
- ✅ 新增語法高亮說明文件

---

## 2024-12-05 - 新增 Tron 和 Polkadot 支援

### 🎉 新增區塊鏈

#### ⚡ Tron
- **頁面**: pages/tron.html
- **功能模組**: scripts/tron.js
- **特色功能**:
  - Base58Check 地址生成與編碼
  - Tron 訊息簽名 (類似 Ethereum)
  - TRX 原生代幣轉帳
  - TRC-20 代幣交易 (類似 ERC-20)
  - 智能合約調用示範

#### 🔴 Polkadot
- **頁面**: pages/polkadot.html
- **功能模組**: scripts/polkadot.js
- **特色功能**:
  - SR25519 簽名演算法
  - SS58 地址格式 (多網路支援)
  - Extrinsic 交易結構
  - XCM 跨鏈訊息協議
  - 平行鏈轉帳示範

### 📝 程式碼範例

每個新增的區塊鏈都包含：
- 4-5 個完整的程式碼範例
- 詳細的技術說明
- 實際可用的代碼片段
- 網路特定的資訊

### 🔧 更新內容

- ✅ 更新首頁卡片，新增 Tron 和 Polkadot
- ✅ 更新所有頁面的導覽列
- ✅ 新增對應的 JavaScript 功能模組
- ✅ 更新 README.md 文件
- ✅ 現在支援 **8 個主流區塊鏈**！

---

## 2024-12-05 - 程式碼範例更新

### ✨ 新增功能

- 為每個範例添加完整的程式碼展示區塊
- 添加「複製程式碼」功能按鈕
- 程式碼區塊採用專業的 IDE 風格設計
- 包含實際可執行的 JavaScript 程式碼範例

### 📝 程式碼範例內容

每個頁面現在都包含：
- 清晰的程式碼註解
- 實際可用的範例代碼
- 一鍵複製功能
- 語法高亮效果

涵蓋範例：
- 雜湊演算法 (SHA-256, SHA-3, RIPEMD-160)
- 對稱加密 (AES, ChaCha20)
- 非對稱加密 (RSA, ECDSA, Ed25519)
- Ethereum (錢包、簽名、EIP-712、交易)
- Bitcoin (錢包、簽名、SegWit 交易)
- Solana (Ed25519 簽名、交易)
- Cosmos (Bech32 地址、交易結構)

---

## 2024-12-05 - 專案重構

### 🎉 重大改進

將原本的單一頁面應用重構為多頁面結構，提升使用體驗和程式碼可維護性。

### ✨ 新增內容

#### 頁面結構
- **首頁 (index.html)**: 新增卡片式導覽頁面，提供更直觀的功能選擇
- **分頁系統**: 將每個功能拆分為獨立頁面
  - pages/hash.html - 雜湊演算法
  - pages/symmetric.html - 對稱加密
  - pages/asymmetric.html - 非對稱加密
  - pages/ethereum.html - Ethereum 功能
  - pages/bitcoin.html - Bitcoin 功能
  - pages/solana.html - Solana 功能
  - pages/cosmos.html - Cosmos 功能

#### 程式碼模組化
- **JavaScript 模組化**: 將功能拆分為獨立的 JS 檔案
  - scripts/hash.js
  - scripts/symmetric.js
  - scripts/asymmetric.js
  - scripts/ethereum.js
  - scripts/bitcoin.js
  - scripts/solana.js
  - scripts/cosmos.js

- **樣式統一化**: 建立共用樣式檔案
  - styles/common.css - 所有頁面共用的樣式

#### 導覽系統
- 每個頁面都有完整的導覽列
- 可以輕鬆在不同功能頁面之間切換
- 當前頁面在導覽列中會高亮顯示

### 🎨 UI/UX 改進

- 首頁採用卡片式設計，更具現代感
- 每個功能分類清晰（密碼學基礎 vs 區塊鏈簽名）
- 改進的響應式設計，支援行動裝置
- 統一的配色方案和視覺風格
- 懸停效果和動畫提升互動體驗

### 📁 檔案結構

```
crypto-web-demo/
├── index.html              # 首頁（導覽）
├── pages/                  # 功能頁面目錄
│   ├── hash.html
│   ├── symmetric.html
│   ├── asymmetric.html
│   ├── ethereum.html
│   ├── bitcoin.html
│   ├── solana.html
│   └── cosmos.html
├── scripts/               # JavaScript 模組
│   ├── hash.js
│   ├── symmetric.js
│   ├── asymmetric.js
│   ├── ethereum.js
│   ├── bitcoin.js
│   ├── solana.js
│   └── cosmos.js
├── styles/                # 樣式檔案
│   └── common.css
├── README.md              # 專案說明
└── CHANGELOG.md          # 更新日誌（本檔案）
```

### 🔧 技術改進

- 模組化架構，便於維護和擴展
- 減少單一檔案的程式碼量
- 改善程式碼組織和可讀性
- 更好的關注點分離（HTML/CSS/JS）
- 避免全域變數衝突

### 📝 文件更新

- 更新 README.md，反映新的專案結構
- 新增本更新日誌檔案
- 在各頁面中加入詳細說明

### 🎯 優點

1. **使用者體驗**: 
   - 不再需要在單一頁面中滾動尋找功能
   - 每個功能都有專屬頁面，更專注
   - 載入速度更快（按需載入資源）

2. **開發者體驗**:
   - 程式碼更易於維護
   - 模組化結構便於新增功能
   - 減少合併衝突的可能性

3. **效能**:
   - 減少初始載入的檔案大小
   - 按需載入 JavaScript 函式庫
   - 更好的快取策略

### 🔄 向後相容性

- 保留原始的 app.js 作為備份
- 所有功能保持不變，只是組織方式改變
- 外部連結和引用的函式庫保持一致

### 🚀 未來展望

- 考慮加入更多區塊鏈支援
- 可能加入暗黑模式
- 考慮加入教學模式或導覽功能
- 可能加入程式碼展示功能
