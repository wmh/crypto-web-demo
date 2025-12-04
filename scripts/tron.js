let currentKeys = {};
let currentSignature = null;

// Tron 錢包生成
function generateTronWallet() {
    try {
        const ec = new elliptic.ec('secp256k1');
        const keyPair = ec.genKeyPair();
        const privateKey = keyPair.getPrivate('hex');
        const publicKey = keyPair.getPublic('hex');
        
        // 簡化的 Tron 地址生成 (實際需要 Keccak-256 和 Base58Check)
        const pubKeyCompressed = keyPair.getPublic(true, 'hex');
        const addressHash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(pubKeyCompressed)).toString();
        const tronAddress = 'T' + addressHash.substring(0, 33);
        
        currentKeys.tronKeyPair = keyPair;
        currentKeys.tronPrivate = privateKey;
        currentKeys.tronAddress = tronAddress;
        
        document.getElementById('tronWalletOutput').innerHTML = `
<strong>私鑰:</strong> ${privateKey}
<strong>公鑰:</strong> ${publicKey.substring(0, 66)}...
<strong>地址:</strong> ${tronAddress}
<strong>網路:</strong> Mainnet (以 T 開頭)
✅ Tron 錢包生成成功！

📝 注意: Tron 使用 Base58Check 編碼
- 主網地址前綴: 0x41 (編碼後以 T 開頭)
- 測試網地址前綴: 0xa0 (編碼後以 27 開頭)`;
        document.getElementById('tronWalletOutput').className = 'output success';
    } catch (error) {
        document.getElementById('tronWalletOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('tronWalletOutput').className = 'output error';
    }
}

// Tron 訊息簽名
function signTronMessage() {
    try {
        if (!currentKeys.tronKeyPair) throw new Error('請先生成錢包');
        const message = document.getElementById('tronMessage').value;
        const prefix = "\x19TRON Signed Message:\n32";
        const fullMessage = prefix + message;
        const msgHash = CryptoJS.SHA256(fullMessage).toString();
        const signature = currentKeys.tronKeyPair.sign(msgHash);
        currentSignature = { tron: signature, tronMsg: msgHash };
        
        document.getElementById('tronMessageOutput').innerHTML = `
<strong>訊息:</strong> ${message}
<strong>前綴:</strong> \\x19TRON Signed Message:\\n32
<strong>雜湊:</strong> ${msgHash}
<strong>簽名 r:</strong> ${signature.r.toString('hex')}
<strong>簽名 s:</strong> ${signature.s.toString('hex')}
<strong>Recovery ID:</strong> ${signature.recoveryParam}
✅ 簽名成功！

📝 Tron 簽名格式與 Ethereum 類似
Recovery ID 用於從簽名恢復公鑰`;
        document.getElementById('tronMessageOutput').className = 'output success';
    } catch (error) {
        document.getElementById('tronMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('tronMessageOutput').className = 'output error';
    }
}

function verifyTronMessage() {
    try {
        if (!currentKeys.tronKeyPair) throw new Error('請先生成錢包');
        if (!currentSignature || !currentSignature.tron) throw new Error('請先簽署');
        const valid = currentKeys.tronKeyPair.verify(currentSignature.tronMsg, currentSignature.tron);
        
        document.getElementById('tronMessageOutput').innerHTML = `
<strong>驗證結果:</strong> ${valid ? '✅ 有效' : '❌ 無效'}`;
        document.getElementById('tronMessageOutput').className = valid ? 'output success' : 'output error';
    } catch (error) {
        document.getElementById('tronMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('tronMessageOutput').className = 'output error';
    }
}

// Tron 交易
function createTronTransaction() {
    try {
        if (!currentKeys.tronKeyPair) throw new Error('請先生成錢包');
        const toAddress = document.getElementById('tronToAddress').value;
        const amount = document.getElementById('tronAmount').value;
        const amountSun = parseFloat(amount) * 1000000; // 1 TRX = 1,000,000 sun
        
        document.getElementById('tronTxOutput').innerHTML = `
<strong>交易類型:</strong> TransferContract
<strong>From:</strong> ${currentKeys.tronAddress}
<strong>To:</strong> ${toAddress}
<strong>Amount:</strong> ${amount} TRX (${amountSun} sun)

<strong>交易結構:</strong>
{
  "raw_data": {
    "contract": [{
      "type": "TransferContract",
      "parameter": {
        "value": {
          "amount": ${amountSun},
          "owner_address": "${currentKeys.tronAddress}",
          "to_address": "${toAddress}"
        }
      }
    }],
    "ref_block_bytes": "...",
    "ref_block_hash": "...",
    "expiration": ${Date.now() + 60000},
    "timestamp": ${Date.now()}
  }
}

✅ 交易結構已建立！

📝 實際發送需要:
1. 從節點獲取 ref_block 資訊
2. 計算交易 ID (SHA-256)
3. 簽署交易
4. 廣播到 TronGrid API`;
        document.getElementById('tronTxOutput').className = 'output success';
    } catch (error) {
        document.getElementById('tronTxOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('tronTxOutput').className = 'output error';
    }
}

// TRC-20 交易
function createTRC20Transaction() {
    try {
        if (!currentKeys.tronKeyPair) throw new Error('請先生成錢包');
        const contractAddress = document.getElementById('trc20Contract').value;
        const toAddress = document.getElementById('trc20ToAddress').value;
        const amount = document.getElementById('trc20Amount').value;
        
        // 模擬 TRC-20 transfer 函數編碼
        const methodId = 'a9059cbb'; // transfer(address,uint256)
        
        document.getElementById('trc20Output').innerHTML = `
<strong>交易類型:</strong> TriggerSmartContract (TRC-20)
<strong>Token Contract:</strong> ${contractAddress}
<strong>From:</strong> ${currentKeys.tronAddress}
<strong>To:</strong> ${toAddress}
<strong>Amount:</strong> ${amount}

<strong>交易結構:</strong>
{
  "raw_data": {
    "contract": [{
      "type": "TriggerSmartContract",
      "parameter": {
        "value": {
          "owner_address": "${currentKeys.tronAddress}",
          "contract_address": "${contractAddress}",
          "data": "${methodId}..."
        }
      }
    }]
  }
}

<strong>函數調用:</strong>
transfer(address recipient, uint256 amount)

✅ TRC-20 交易結構已建立！

📝 常見 TRC-20 代幣:
- USDT: TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
- USDC: TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8`;
        document.getElementById('trc20Output').className = 'output success';
    } catch (error) {
        document.getElementById('trc20Output').innerHTML = `❌ ${error.message}`;
        document.getElementById('trc20Output').className = 'output error';
    }
}

console.log('⚡ Tron functions loaded');
