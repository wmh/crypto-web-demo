let currentKeys = {};
let currentSignature = null;

// Cosmos
function generateCosmosWallet() {
    try {
        const ec = new elliptic.ec('secp256k1');
        const keyPair = ec.genKeyPair();
        const privateKey = keyPair.getPrivate('hex');
        const publicKeyCompressed = keyPair.getPublic(true, 'hex');
        
        const pubkeyHash = CryptoJS.RIPEMD160(
            CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKeyCompressed))
        ).toString();
        
        currentKeys.cosmosKeyPair = keyPair;
        currentKeys.cosmosPrivate = privateKey;
        
        document.getElementById('cosmosWalletOutput').innerHTML = `
<strong>私鑰:</strong> ${privateKey}
<strong>公鑰:</strong> ${publicKeyCompressed}
<strong>地址:</strong> cosmos1${pubkeyHash.substring(0, 38)}
✅ Cosmos 錢包生成成功！`;
        document.getElementById('cosmosWalletOutput').className = 'output success';
    } catch (error) {
        document.getElementById('cosmosWalletOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('cosmosWalletOutput').className = 'output error';
    }
}

function signCosmosMessage() {
    try {
        if (!currentKeys.cosmosKeyPair) throw new Error('請先生成錢包');
        const message = document.getElementById('cosmosMessage').value;
        const msgHash = CryptoJS.SHA256(message).toString();
        const signature = currentKeys.cosmosKeyPair.sign(msgHash);
        currentSignature = { cosmos: signature, cosmosMsg: msgHash };
        
        document.getElementById('cosmosMessageOutput').innerHTML = `
<strong>訊息:</strong> ${message}
<strong>簽名:</strong> ${signature.r.toString('hex').substring(0, 32)}...
✅ 簽名成功！`;
        document.getElementById('cosmosMessageOutput').className = 'output success';
    } catch (error) {
        document.getElementById('cosmosMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('cosmosMessageOutput').className = 'output error';
    }
}

function verifyCosmosMessage() {
    try {
        if (!currentKeys.cosmosKeyPair) throw new Error('請先生成錢包');
        if (!currentSignature || !currentSignature.cosmos) throw new Error('請先簽署');
        const valid = currentKeys.cosmosKeyPair.verify(currentSignature.cosmosMsg, currentSignature.cosmos);
        
        document.getElementById('cosmosMessageOutput').innerHTML = `
<strong>驗證:</strong> ${valid ? '✅ 有效' : '❌ 無效'}`;
        document.getElementById('cosmosMessageOutput').className = valid ? 'output success' : 'output error';
    } catch (error) {
        document.getElementById('cosmosMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('cosmosMessageOutput').className = 'output error';
    }
}

function createCosmosTransaction() {
    try {
        if (!currentKeys.cosmosKeyPair) throw new Error('請先生成錢包');
        const toAddress = document.getElementById('cosmosToAddress').value;
        const amount = document.getElementById('cosmosAmount').value;
        
        document.getElementById('cosmosTxOutput').innerHTML = `
<strong>To:</strong> ${toAddress || 'cosmos1...'}
<strong>Amount:</strong> ${amount} ATOM
<strong>Chain:</strong> cosmoshub-4
✅ 交易演示`;
        document.getElementById('cosmosTxOutput').className = 'output success';
    } catch (error) {
        document.getElementById('cosmosTxOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('cosmosTxOutput').className = 'output error';
    }
}

console.log('⚛ Cosmos functions loaded');
