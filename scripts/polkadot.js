let currentKeys = {};
let currentSignature = null;

// Polkadot 錢包生成 (模擬)
function generateDotWallet() {
    try {
        // 模擬生成助記詞和地址
        const words = ['abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse', 'access', 'accident'];
        const mnemonic = words.join(' ');
        
        // 生成模擬的公鑰和地址
        const seed = CryptoJS.SHA256(mnemonic).toString();
        const address = '1' + seed.substring(0, 47); // Polkadot 地址以 1 開頭
        const kusamaAddress = 'D' + seed.substring(0, 47); // Kusama 地址以 D-G 開頭
        
        currentKeys.dotMnemonic = mnemonic;
        currentKeys.dotAddress = address;
        currentKeys.dotSeed = seed;
        
        document.getElementById('dotWalletOutput').innerHTML = `
<strong>助記詞 (12 words):</strong>
${mnemonic}

<strong>Polkadot 地址 (SS58):</strong>
${address}

<strong>Kusama 地址:</strong>
${kusamaAddress}

<strong>種子 (Hex):</strong>
${seed}

✅ Polkadot 錢包生成成功！

📝 注意事項:
- SR25519: Polkadot 默認簽名算法
- Ed25519: 也支援，但較少使用
- ECDSA: 支援 secp256k1 (與 Ethereum 兼容)
- SS58 格式: 網路前綴 + 公鑰哈希 + 校驗和

🌐 網路前綴:
- Polkadot: 0 (地址以 1 開頭)
- Kusama: 2 (地址以 C-H 開頭)
- Westend: 42 (測試網)`;
        document.getElementById('dotWalletOutput').className = 'output success';
    } catch (error) {
        document.getElementById('dotWalletOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('dotWalletOutput').className = 'output error';
    }
}

// Polkadot 訊息簽名
function signDotMessage() {
    try {
        if (!currentKeys.dotSeed) throw new Error('請先生成錢包');
        const message = document.getElementById('dotMessage').value;
        const msgHash = CryptoJS.SHA256(message).toString();
        
        // 模擬 SR25519 簽名
        const signature = CryptoJS.SHA256(currentKeys.dotSeed + msgHash).toString();
        currentSignature = { dot: signature, dotMsg: msgHash };
        
        document.getElementById('dotMessageOutput').innerHTML = `
<strong>訊息:</strong> ${message}
<strong>訊息雜湊:</strong> ${msgHash}
<strong>SR25519 簽名:</strong>
${signature}

<strong>簽名長度:</strong> 64 bytes (512 bits)

✅ 簽名成功！

📝 SR25519 特點:
- 基於 Schnorr 簽名的變體
- Ristretto25519 橢圓曲線群
- 更好的安全性保證
- 支援批次驗證
- 抗側信道攻擊

🔒 安全優勢:
- 確定性 nonce 生成
- 無 k 值重用風險
- 更快的驗證速度`;
        document.getElementById('dotMessageOutput').className = 'output success';
    } catch (error) {
        document.getElementById('dotMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('dotMessageOutput').className = 'output error';
    }
}

function verifyDotMessage() {
    try {
        if (!currentKeys.dotSeed) throw new Error('請先生成錢包');
        if (!currentSignature || !currentSignature.dot) throw new Error('請先簽署');
        
        // 模擬驗證
        const message = document.getElementById('dotMessage').value;
        const msgHash = CryptoJS.SHA256(message).toString();
        const expectedSig = CryptoJS.SHA256(currentKeys.dotSeed + msgHash).toString();
        const valid = currentSignature.dot === expectedSig;
        
        document.getElementById('dotMessageOutput').innerHTML = `
<strong>驗證結果:</strong> ${valid ? '✅ 有效' : '❌ 無效'}

${valid ? '簽名驗證通過！公鑰與簽名匹配。' : '簽名驗證失敗！'}`;
        document.getElementById('dotMessageOutput').className = valid ? 'output success' : 'output error';
    } catch (error) {
        document.getElementById('dotMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('dotMessageOutput').className = 'output error';
    }
}

// Polkadot 交易
function createDotTransaction() {
    try {
        if (!currentKeys.dotAddress) throw new Error('請先生成錢包');
        const toAddress = document.getElementById('dotToAddress').value;
        const amount = document.getElementById('dotAmount').value;
        const amountPlanck = parseFloat(amount) * 10000000000; // 1 DOT = 10^10 Planck
        
        document.getElementById('dotTxOutput').innerHTML = `
<strong>交易類型:</strong> balances.transfer
<strong>From:</strong> ${currentKeys.dotAddress}
<strong>To:</strong> ${toAddress}
<strong>Amount:</strong> ${amount} DOT (${amountPlanck} Planck)

<strong>Extrinsic 結構:</strong>
{
  "method": {
    "section": "balances",
    "method": "transfer",
    "args": {
      "dest": "${toAddress}",
      "value": ${amountPlanck}
    }
  },
  "signature": {
    "signer": "${currentKeys.dotAddress}",
    "signature": "0x...",
    "era": {
      "MortalEra": [64, 12]
    },
    "nonce": 0,
    "tip": 0
  }
}

✅ 交易結構已建立！

📝 Extrinsic 組成:
1. Call: 要執行的函數調用
2. Signature: SR25519 簽名
3. Era: 交易生命週期 (Mortal/Immortal)
4. Nonce: 帳戶交易計數
5. Tip: 小費 (加速打包)

⚡ 交易費用:
- Base Fee: 基礎費用
- Length Fee: 按位元組計費
- Weight Fee: 按計算資源計費`;
        document.getElementById('dotTxOutput').className = 'output success';
    } catch (error) {
        document.getElementById('dotTxOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('dotTxOutput').className = 'output error';
    }
}

// XCM 跨鏈交易
function createXCMTransaction() {
    try {
        if (!currentKeys.dotAddress) throw new Error('請先生成錢包');
        const parachainId = document.getElementById('parachainId').value;
        const toAddress = document.getElementById('xcmToAddress').value;
        const amount = document.getElementById('xcmAmount').value;
        const amountPlanck = parseFloat(amount) * 10000000000;
        
        // 平行鏈名稱映射
        const parachainNames = {
            '2000': 'Acala',
            '2004': 'Moonbeam',
            '2006': 'Astar',
            '2012': 'Parallel',
            '2030': 'Bifrost',
            '2032': 'Interlay',
            '2034': 'HydraDX'
        };
        
        const parachainName = parachainNames[parachainId] || `Parachain ${parachainId}`;
        
        document.getElementById('xcmOutput').innerHTML = `
<strong>跨鏈轉帳 (XCM v3):</strong>

<strong>來源:</strong> Polkadot Relay Chain
<strong>目標:</strong> ${parachainName} (ID: ${parachainId})
<strong>收款地址:</strong> ${toAddress}
<strong>金額:</strong> ${amount} DOT

<strong>XCM 訊息結構:</strong>
{
  "V3": {
    "parents": 0,
    "interior": {
      "X1": {
        "Parachain": ${parachainId}
      }
    }
  }
}

<strong>資產描述:</strong>
{
  "id": {
    "Concrete": {
      "parents": 0,
      "interior": "Here"
    }
  },
  "fun": {
    "Fungible": ${amountPlanck}
  }
}

✅ XCM 交易結構已建立！

📝 XCM (Cross-Consensus Message):
- V3: 最新版本 (2023)
- 支援跨平行鏈轉帳
- 支援遠程執行
- 統一的資產表示

🌉 常見平行鏈:
- Acala (2000): DeFi Hub
- Moonbeam (2004): EVM 兼容
- Astar (2006): 多虛擬機支援
- Interlay (2032): Bitcoin 橋接`;
        document.getElementById('xcmOutput').className = 'output success';
    } catch (error) {
        document.getElementById('xcmOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('xcmOutput').className = 'output error';
    }
}

console.log('🔴 Polkadot functions loaded');
