# 🔐 加密演算法與區塊鏈簽名範例

一個純前端的加密演算法和區塊鏈簽名演示專案，涵蓋主流加密技術和區塊鏈簽名機制。

## ✨ 特色功能

### 🎨 專業程式碼展示
- **語法高亮**: Prism.js + VS Code Dark+ 主題
- **一鍵複製**: 快速複製程式碼到剪貼簿
- **即時互動**: 瀏覽器中直接測試功能
- **詳細註解**: 每行代碼都有清楚說明

### 1. 加密演算法展示
- **雜湊演算法**: SHA-256, SHA-3/Keccak-256, RIPEMD-160
- **對稱加密**: AES-256-GCM, ChaCha20-Poly1305
- **非對稱加密**: RSA-2048, ECDSA (secp256k1), Ed25519

### 2. 區塊鏈簽名與交易
支援以下主流一層鏈：

#### ⟠ Ethereum
- 錢包生成（BIP-39 助記詞）
- Personal Sign（個人訊息簽名）
- EIP-712 結構化資料簽名
- EIP-1559 交易建立與簽署

#### ₿ Bitcoin
- 多種地址格式（P2PKH, P2SH, P2WPKH）
- Bitcoin Message Signing
- SegWit 交易建立與簽署
- UTXO 模型展示

#### ◎ Solana
- Ed25519 密鑰生成
- 訊息簽名與驗證
- 轉帳交易建立
- 高效能簽名演示

#### ⚛ Cosmos
- secp256k1 密鑰生成
- Bech32 地址格式
- 訊息簽名
- MsgSend 交易建立

#### ⚡ Tron
- Base58Check 地址編碼
- Tron 訊息簽名
- TRX 轉帳交易
- TRC-20 代幣交易

#### 🔴 Polkadot
- SR25519 密鑰生成
- SS58 地址格式
- Extrinsic 簽名
- XCM 跨鏈訊息
- Tron 訊息簽名
- TRX 轉帳交易
- TRC-20 代幣交易

#### 🔴 Polkadot
- SR25519 密鑰生成
- SS58 地址格式
- Extrinsic 簽名
- XCM 跨鏈訊息

## 🚀 快速開始

### 方法一：直接開啟（推薦）

1. 下載或 clone 此專案
2. 直接用瀏覽器開啟 `index.html`
3. 開始使用！

```bash
# 克隆專案
git clone <repository-url>
cd crypto-web-demo

# 直接開啟
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### 方法二：使用本地伺服器

```bash
# 使用 Python
python3 -m http.server 8000

# 使用 Node.js (需安裝 http-server)
npx http-server -p 8000

# 使用 PHP
php -S localhost:8000
```

然後訪問 `http://localhost:8000`

## 📚 使用說明

### 導覽
1. 開啟 `index.html` 查看所有範例的卡片式導覽
2. 點擊任一卡片進入該功能的專屬頁面
3. 每個頁面都有獨立的功能和清晰的操作說明

### 使用程式碼範例
1. 📖 **閱讀範例** - 每個功能都有完整的程式碼展示
2. 📋 **複製程式碼** - 點擊「複製」按鈕一鍵複製
3. 🎮 **互動測試** - 使用頁面上的表單實際測試
4. 💡 **學以致用** - 將程式碼應用到您的專案中

詳細的程式碼範例說明請參考 [CODE_EXAMPLES.md](CODE_EXAMPLES.md)

### 雜湊演算法頁面
1. 進入雜湊演算法頁面
2. 輸入要雜湊的文字
3. 點擊對應按鈕查看雜湊結果
4. 比較不同演算法的輸出長度和特性

### 對稱加密頁面
1. 進入對稱加密頁面
2. 輸入明文和密碼
3. 點擊「🔒 加密」查看密文
4. 點擊「🔓 解密」恢復原文

### 非對稱加密頁面
1. 進入非對稱加密頁面
2. 點擊「生成密鑰對」
3. 輸入訊息並簽名
4. 驗證簽名有效性

### 區塊鏈簽名頁面
1. 選擇對應的區塊鏈頁面（Ethereum/Bitcoin/Solana/Cosmos）
2. 生成錢包
3. 簽署訊息或建立交易
4. 查看詳細的簽名資訊和交易結構

## 🔧 技術棧

### 純前端實現，無需 Node.js 後端！

**核心函式庫（透過 CDN 載入）：**
- **CryptoJS** - 雜湊、對稱加密
- **elliptic** - 橢圓曲線密碼學（secp256k1）
- **@noble/ed25519** - Ed25519 簽名
- **ethers.js** - Ethereum 錢包和交易
- **bitcoinjs-lib** - Bitcoin 錢包和交易
- **@solana/web3.js** - Solana 錢包和交易
- **tweetnacl** - NaCl 加密庫
- **bs58** - Base58 編碼

**優點：**
✅ 無需安裝 Node.js 或任何依賴
✅ 直接在瀏覽器中運行
✅ 所有計算在客戶端完成
✅ 無需後端伺服器
✅ 完全離線可用（下載後）

## ⚠️ 安全警告

**🔴 重要提示：**

1. **此專案僅供教育和演示用途**
2. **請勿在主網使用此處生成的密鑰或地址**
3. **真實應用應使用硬體錢包或專業的密鑰管理方案**
4. **瀏覽器環境的隨機數生成器可能不如硬體隨機數安全**
5. **私鑰一旦洩露無法撤銷，務必小心保管**

## 📖 學習資源

### 加密學基礎
- [SHA-2](https://en.wikipedia.org/wiki/SHA-2)
- [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
- [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
- [Elliptic Curve Cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)

### 區塊鏈標準
- [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) - 助記詞標準
- [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) - HD 錢包路徑
- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) - 簡單重放攻擊保護
- [EIP-712](https://eips.ethereum.org/EIPS/eip-712) - 結構化資料簽名
- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) - 費用市場改革

### 官方文件
- [Ethereum Developer Docs](https://ethereum.org/developers)
- [Bitcoin Developer Guide](https://developer.bitcoin.org/)
- [Solana Docs](https://docs.solana.com/)
- [Cosmos SDK Docs](https://docs.cosmos.network/)

## 🛠️ 進階用法

### 擴展到其他鏈

此專案架構可輕鬆擴展到其他區塊鏈：

```javascript
// 添加新鏈的範例
function generateNewChainWallet() {
    // 1. 生成密鑰對
    // 2. 計算地址
    // 3. 展示結果
}

function signNewChainMessage() {
    // 1. 準備訊息
    // 2. 簽名
    // 3. 展示簽名
}

function createNewChainTransaction() {
    // 1. 建構交易
    // 2. 簽署交易
    // 3. 序列化交易
}
```

### 可添加的鏈
- Polkadot (sr25519)
- Cardano (Ed25519)
- Avalanche (secp256k1)
- Near Protocol (Ed25519)
- Aptos (Ed25519)
- Sui (Ed25519)

## 📁 專案結構

```
crypto-web-demo/
├── index.html              # 首頁 - 導覽頁面
├── pages/                  # 各功能頁面
│   ├── hash.html          # 雜湊演算法範例
│   ├── symmetric.html     # 對稱加密範例
│   ├── asymmetric.html    # 非對稱加密範例
│   ├── ethereum.html      # Ethereum 簽名與交易
│   ├── bitcoin.html       # Bitcoin 簽名與交易
│   ├── solana.html        # Solana 簽名與交易
│   └── cosmos.html        # Cosmos 簽名與交易
├── scripts/               # JavaScript 功能模組
│   ├── hash.js
│   ├── symmetric.js
│   ├── asymmetric.js
│   ├── ethereum.js
│   ├── bitcoin.js
│   ├── solana.js
│   └── cosmos.js
├── styles/                # 樣式檔案
│   └── common.css         # 共用樣式
└── README.md              # 說明文件
```

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

可以貢獻的方向：
- 添加更多區塊鏈支援
- 改進 UI/UX
- 添加更多加密演算法
- 修復 bug
- 改進文件

## 📄 授權

MIT License

## 🔗 相關連結

- [GitHub Repository](#) 
- [教學文章](#)
- [視頻演示](#)

## 🙏 致謝

感謝以下開源專案：
- ethers.js
- bitcoinjs-lib
- @solana/web3.js
- CryptoJS
- elliptic
- @noble libraries

---

**記住：學習加密學是為了建構更安全的應用，而不是破解它！🔐**
