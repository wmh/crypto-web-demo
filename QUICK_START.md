# 🚀 快速開始指南

## 30 秒快速上手

1. **開啟專案**
   ```bash
   # 只需要用瀏覽器開啟 index.html
   open index.html
   # 或
   firefox index.html
   # 或
   google-chrome index.html
   ```

2. **選擇範例**
   - 點擊首頁的任一卡片
   - 進入您感興趣的功能頁面

3. **開始學習**
   - 閱讀程式碼範例
   - 點擊「複製」複製程式碼
   - 使用互動表單測試功能

## 📋 功能清單

### 🔐 密碼學基礎

| 功能 | 頁面 | 主要內容 |
|------|------|----------|
| 雜湊演算法 | `pages/hash.html` | SHA-256, SHA-3, RIPEMD-160 |
| 對稱加密 | `pages/symmetric.html` | AES-256-GCM, ChaCha20 |
| 非對稱加密 | `pages/asymmetric.html` | RSA, ECDSA, Ed25519 |

### ⛓️ 區塊鏈簽名

| 區塊鏈 | 頁面 | 主要功能 |
|--------|------|----------|
| Ethereum | `pages/ethereum.html` | 錢包、簽名、EIP-712、EIP-1559 |
| Bitcoin | `pages/bitcoin.html` | 多種地址、SegWit 交易 |
| Solana | `pages/solana.html` | Ed25519、高效能簽名 |
| Cosmos | `pages/cosmos.html` | Bech32 地址、IBC |
| Tron | `pages/tron.html` | Base58Check、TRC-20 代幣 |
| Polkadot | `pages/polkadot.html` | SR25519、XCM 跨鏈 |

## 💻 程式碼範例使用

### 範例 1: 計算 SHA-256

```javascript
// 1. 引入函式庫 (頁面已自動載入)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"></script>

// 2. 計算雜湊
const input = "Hello, Blockchain!";
const hash = CryptoJS.SHA256(input).toString();
console.log(hash);

// 3. 輸出
// c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7df31ad9e51a
```

### 範例 2: Ethereum 錢包生成

```javascript
// 1. 引入 ethers.js
// <script src="https://cdn.jsdelivr.net/npm/ethers@6.9.0/dist/ethers.umd.min.js"></script>

// 2. 生成錢包
const wallet = ethers.Wallet.createRandom();

// 3. 取得資訊
console.log("地址:", wallet.address);
console.log("私鑰:", wallet.privateKey);
console.log("助記詞:", wallet.mnemonic.phrase);
```

### 範例 3: AES 加密

```javascript
// 1. 加密
const plaintext = "Secret Message";
const password = "myPassword123";
const ciphertext = CryptoJS.AES.encrypt(plaintext, password).toString();

// 2. 解密
const bytes = CryptoJS.AES.decrypt(ciphertext, password);
const decrypted = bytes.toString(CryptoJS.enc.Utf8);

console.log("加密:", ciphertext);
console.log("解密:", decrypted);
```

## 🎯 學習路徑建議

### 初學者路徑

1. **雜湊演算法** (15 分鐘)
   - 了解單向雜湊的概念
   - 嘗試不同的輸入值
   - 觀察雪崩效應

2. **對稱加密** (20 分鐘)
   - 理解加密/解密流程
   - 測試 AES 加密
   - 體驗密鑰的重要性

3. **非對稱加密** (30 分鐘)
   - 生成密鑰對
   - 理解公鑰/私鑰概念
   - 實作簽名與驗證

### 進階路徑

4. **Ethereum** (45 分鐘)
   - 生成 HD 錢包
   - Personal Sign
   - EIP-712 結構化簽名
   - 建立並簽署交易

5. **其他區塊鏈** (60 分鐘)
   - Bitcoin 地址格式
   - Solana 高效能簽名
   - Cosmos 跨鏈機制

## 📱 行動裝置使用

本專案完全支援行動裝置！

- ✅ 響應式設計
- ✅ 觸控友善界面
- ✅ 自動調整佈局
- ✅ 一鍵複製程式碼

## 🔧 開發環境設置

如果您想在本地開發環境中使用這些程式碼：

### Node.js 環境

```bash
# 1. 初始化專案
npm init -y

# 2. 安裝依賴
npm install crypto-js elliptic @noble/ed25519 ethers @solana/web3.js

# 3. 在您的專案中使用
const CryptoJS = require('crypto-js');
const { ec } = require('elliptic');
const { ethers } = require('ethers');
```

### 瀏覽器環境

```html
<!-- 直接使用 CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ethers@6.9.0/dist/ethers.umd.min.js"></script>
```

## 🎓 學習資源

### 推薦閱讀順序

1. 📖 [README.md](README.md) - 專案概覽
2. 💻 [CODE_EXAMPLES.md](CODE_EXAMPLES.md) - 詳細程式碼範例
3. 📝 [CHANGELOG.md](CHANGELOG.md) - 更新歷史

## ❓ 常見問題

### Q: 需要安裝什麼軟體嗎？
**A:** 不需要！只要有現代瀏覽器就可以使用。

### Q: 可以離線使用嗎？
**A:** 可以，但需要先載入一次讓瀏覽器快取 CDN 資源。

### Q: 程式碼可以商用嗎？
**A:** 可以，專案採用 MIT 授權，但建議在生產環境中做更嚴謹的測試。

### Q: 生成的私鑰安全嗎？
**A:** 僅供學習使用，請勿用於存儲真實資產。生產環境請使用硬體錢包。

### Q: 如何貢獻程式碼？
**A:** 歡迎提交 Issue 或 Pull Request！

## 💡 使用技巧

### 技巧 1: 快速切換範例
每個頁面頂部都有完整的導覽列，可以快速切換不同功能。

### 技巧 2: 複製程式碼
點擊程式碼區塊右上角的「複製」按鈕，程式碼會自動複製到剪貼簿。

### 技巧 3: 修改參數測試
嘗試修改輸入欄位的值，觀察輸出如何變化。

### 技巧 4: 開啟開發者工具
按 F12 開啟瀏覽器開發者工具，可以看到更詳細的執行過程。

## 🎉 開始探索

準備好了嗎？現在就開啟 `index.html` 開始您的加密學習之旅吧！

---

**祝您學習愉快！有任何問題歡迎提 Issue。** 💪
