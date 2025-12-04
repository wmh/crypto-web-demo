let currentKeys = {};
let currentSignature = null;

// Bitcoin
function generateBtcWallet() {
    try {
        const ec = new elliptic.ec('secp256k1');
        const keyPair = ec.genKeyPair();
        const privateKey = keyPair.getPrivate('hex');
        const publicKeyCompressed = keyPair.getPublic(true, 'hex');
        
        const pubkeyHash = CryptoJS.RIPEMD160(
            CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKeyCompressed))
        ).toString();
        
        currentKeys.btcKeyPair = keyPair;
        currentKeys.btcPrivate = privateKey;
        
        document.getElementById('btcWalletOutput').innerHTML = `
<strong>私鑰:</strong> ${privateKey}
<strong>公鑰:</strong> ${publicKeyCompressed}
<strong>P2PKH:</strong> 1${pubkeyHash.substring(0, 33)}
<strong>P2WPKH:</strong> bc1q${pubkeyHash.substring(0, 38)}
✅ Bitcoin 錢包生成成功！`;
        document.getElementById('btcWalletOutput').className = 'output success';
    } catch (error) {
        document.getElementById('btcWalletOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('btcWalletOutput').className = 'output error';
    }
}

function signBtcMessage() {
    try {
        if (!currentKeys.btcKeyPair) throw new Error('請先生成錢包');
        const message = document.getElementById('btcMessage').value;
        const msgHash = CryptoJS.SHA256('Bitcoin Signed Message:\n' + message).toString();
        const signature = currentKeys.btcKeyPair.sign(msgHash);
        currentSignature = { btc: signature, btcMsg: msgHash };
        
        document.getElementById('btcMessageOutput').innerHTML = `
<strong>訊息:</strong> ${message}
<strong>簽名:</strong> ${signature.r.toString('hex').substring(0, 32)}...
✅ 簽名成功！`;
        document.getElementById('btcMessageOutput').className = 'output success';
    } catch (error) {
        document.getElementById('btcMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('btcMessageOutput').className = 'output error';
    }
}

function verifyBtcMessage() {
    try {
        if (!currentKeys.btcKeyPair) throw new Error('請先生成錢包');
        if (!currentSignature || !currentSignature.btc) throw new Error('請先簽署');
        const valid = currentKeys.btcKeyPair.verify(currentSignature.btcMsg, currentSignature.btc);
        
        document.getElementById('btcMessageOutput').innerHTML = `
<strong>驗證:</strong> ${valid ? '✅ 有效' : '❌ 無效'}`;
        document.getElementById('btcMessageOutput').className = valid ? 'output success' : 'output error';
    } catch (error) {
        document.getElementById('btcMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('btcMessageOutput').className = 'output error';
    }
}

function createBtcTransaction() {
    try {
        if (!currentKeys.btcKeyPair) throw new Error('請先生成錢包');
        const toAddress = document.getElementById('btcToAddress').value;
        const amount = document.getElementById('btcAmount').value;
        
        document.getElementById('btcTxOutput').innerHTML = `
<strong>To:</strong> ${toAddress}
<strong>Amount:</strong> ${amount} BTC
<strong>Type:</strong> P2WPKH (SegWit)
✅ 交易演示（需完整庫支援）`;
        document.getElementById('btcTxOutput').className = 'output success';
    } catch (error) {
        document.getElementById('btcTxOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('btcTxOutput').className = 'output error';
    }
}

console.log('₿ Bitcoin functions loaded');
