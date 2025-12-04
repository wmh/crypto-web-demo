# 📝 程式碼範例指南

本專案的每個範例頁面都包含完整的可執行程式碼，方便學習和快速上手。

## 🎯 功能特色

### 1. 程式碼展示區塊

每個範例都有一個專業設計的程式碼區塊，包含：

```
┌─────────────────────────────────────┐
│ 💻 JavaScript 範例        [複製]   │  ← 標題列（深灰背景）
├─────────────────────────────────────┤
│ // 實際可執行的程式碼              │
│ const example = "code here";       │  ← 程式碼區（白色背景）
│ console.log(example);              │
└─────────────────────────────────────┘
```

### 2. 一鍵複製功能

- 點擊右上角的「複製」按鈕
- 程式碼會自動複製到剪貼簿
- 按鈕會顯示「已複製！」確認訊息
- 2 秒後自動恢復為「複製」

### 3. 程式碼內容

所有程式碼範例包含：
- ✅ 實際可執行的 JavaScript
- ✅ 詳細的註解說明
- ✅ 函式庫引用說明
- ✅ 常見使用場景

## 📚 各頁面範例概覽

### 雜湊演算法 (hash.html)

**SHA-256 範例**
```javascript
const input = "Hello, Blockchain!";
const hash = CryptoJS.SHA256(input).toString();
console.log(hash);
```

**SHA-3/Keccak-256 範例**
```javascript
const hash = CryptoJS.SHA3(input, { outputLength: 256 }).toString();
```

**RIPEMD-160 範例**
```javascript
const hash = CryptoJS.RIPEMD160(input).toString();
// 用於比特幣地址生成
```

---

### 對稱加密 (symmetric.html)

**AES-256 加密/解密**
```javascript
// 加密
const ciphertext = CryptoJS.AES.encrypt(plaintext, password).toString();

// 解密
const bytes = CryptoJS.AES.decrypt(ciphertext, password);
const decrypted = bytes.toString(CryptoJS.enc.Utf8);
```

---

### 非對稱加密 (asymmetric.html)

**ECDSA (secp256k1)**
```javascript
const ec = new EC('secp256k1');
const keyPair = ec.genKeyPair();

// 簽署
const signature = keyPair.sign(msgHash);

// 驗證
const valid = keyPair.verify(msgHash, signature);
```

**Ed25519**
```javascript
const privateKey = ed25519.utils.randomPrivateKey();
const publicKey = await ed25519.getPublicKey(privateKey);
const signature = await ed25519.sign(message, privateKey);
```

---

### Ethereum (ethereum.html)

**生成錢包**
```javascript
const wallet = ethers.Wallet.createRandom();
console.log("地址:", wallet.address);
console.log("私鑰:", wallet.privateKey);
```

**簽署訊息**
```javascript
const signature = await wallet.signMessage(message);
const recoveredAddress = ethers.verifyMessage(message, signature);
```

**EIP-712 結構化簽名**
```javascript
const signature = await wallet.signTypedData(domain, types, value);
```

**EIP-1559 交易**
```javascript
const tx = {
    to: '0x...',
    value: ethers.parseEther('0.1'),
    type: 2 // EIP-1559
};
const signedTx = await wallet.signTransaction(tx);
```

---

### Bitcoin (bitcoin.html)

**生成錢包與地址**
```javascript
const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic(true, 'hex');

// P2PKH (Legacy): 1...
// P2WPKH (SegWit): bc1q...
```

**訊息簽名**
```javascript
const prefix = "Bitcoin Signed Message:\n";
const msgHash = CryptoJS.SHA256(prefix + message).toString();
const signature = keyPair.sign(msgHash);
```

---

### Solana (solana.html)

**生成錢包**
```javascript
const keypair = Keypair.generate();
console.log("公鑰:", keypair.publicKey.toString());
```

**簽署訊息**
```javascript
const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
const valid = nacl.sign.detached.verify(messageBytes, signature, publicKey);
```

**轉帳交易**
```javascript
const instruction = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: new PublicKey('...'),
    lamports: amount * LAMPORTS_PER_SOL
});
const transaction = new Transaction().add(instruction);
```

---

### Cosmos (cosmos.html)

**生成 Bech32 地址**
```javascript
const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic(true, 'hex');
// 經過 SHA-256 和 RIPEMD-160 處理後 Bech32 編碼
```

**交易結構**
```javascript
const txBody = {
    messages: [{
        '@type': '/cosmos.bank.v1beta1.MsgSend',
        from_address: 'cosmos1...',
        to_address: 'cosmos1...',
        amount: [{ denom: 'uatom', amount: '100000' }]
    }]
};
```

---

### Tron (tron.html)

**生成錢包**
```javascript
const ec = new EC('secp256k1');
const keyPair = ec.genKeyPair();
// Tron 使用 Base58Check 編碼
// 主網地址以 T 開頭
```

**TRC-20 代幣轉帳**
```javascript
// transfer(address,uint256) 函數編碼
const methodId = 'a9059cbb';
const data = methodId + paddedAddress + paddedAmount;

const transaction = {
    type: "TriggerSmartContract",
    contract_address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t" // USDT
};
```

---

### Polkadot (polkadot.html)

**生成錢包 (SR25519)**
```javascript
const { sr25519PairFromSeed, encodeAddress } = require('@polkadot/util-crypto');

const seed = mnemonicToMiniSecret(mnemonic);
const keyPair = sr25519PairFromSeed(seed);
const address = encodeAddress(keyPair.publicKey, 0); // Polkadot
```

**XCM 跨鏈轉帳**
```javascript
const xcmTransfer = api.tx.xcmPallet.reserveTransferAssets(
    { V3: { parents: 0, interior: { X1: { Parachain: 2000 } } } },
    beneficiary,
    assets,
    0
);
await xcmTransfer.signAndSend(keyPair);
```

## 💡 使用建議

### 學習流程

1. **閱讀說明** - 了解每個演算法的基本概念
2. **查看程式碼** - 理解實作方式
3. **複製程式碼** - 在自己的專案中嘗試
4. **執行範例** - 點擊按鈕查看實際效果
5. **修改參數** - 嘗試不同的輸入值

### 在實際專案中使用

1. 複製所需的程式碼範例
2. 安裝相應的 npm 套件：
   ```bash
   npm install crypto-js elliptic @noble/ed25519 ethers @solana/web3.js
   ```
3. 根據需求調整程式碼
4. 記得處理錯誤和邊界情況

### 注意事項

⚠️ **重要提醒**：

- 範例程式碼僅供學習使用
- 生產環境需要更嚴謹的錯誤處理
- 私鑰管理需要特別小心
- 建議使用硬體錢包存儲重要資產
- 測試時使用測試網路

## 🔗 相關資源

- [CryptoJS 文件](https://cryptojs.gitbook.io/docs/)
- [elliptic 文件](https://github.com/indutny/elliptic)
- [ethers.js 文件](https://docs.ethers.org/)
- [Solana Web3.js 文件](https://solana-labs.github.io/solana-web3.js/)
- [Cosmos SDK 文件](https://docs.cosmos.network/)

## 🤝 貢獻

如果您發現程式碼範例有誤或想要添加更多範例，歡迎提交 Pull Request！

---

**祝您學習愉快！🎉**
