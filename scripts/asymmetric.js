let currentKeys = {};
let currentSignature = null;

// RSA (Simplified)
function generateRSAKeys() {
    currentKeys.rsaPublic = "公鑰（模擬）";
    currentKeys.rsaPrivate = "私鑰（模擬）";
    document.getElementById('rsaKeysOutput').innerHTML = `
<strong>公鑰:</strong> ${currentKeys.rsaPublic}
<strong>私鑰:</strong> ${currentKeys.rsaPrivate}
⚠️ 完整 RSA 需要 Web Crypto API`;
    document.getElementById('rsaKeysOutput').className = 'output success';
}

function encryptRSA() {
    const plaintext = document.getElementById('rsaPlaintext').value;
    document.getElementById('rsaOutput').innerHTML = `
<strong>原文:</strong> ${plaintext}
<strong>加密模擬:</strong> 使用公鑰加密`;
}

function decryptRSA() {
    const plaintext = document.getElementById('rsaPlaintext').value;
    document.getElementById('rsaOutput').innerHTML = `
<strong>解密後:</strong> ${plaintext}`;
}

// ECDSA
function generateECDSAKeys() {
    try {
        const ec = new elliptic.ec('secp256k1');
        const keyPair = ec.genKeyPair();
        currentKeys.ecdsaKeyPair = keyPair;
        currentKeys.ecdsaPrivate = keyPair.getPrivate('hex');
        currentKeys.ecdsaPublic = keyPair.getPublic('hex');
        
        document.getElementById('ecdsaKeysOutput').innerHTML = `
<strong>私鑰:</strong> ${currentKeys.ecdsaPrivate}
<strong>公鑰:</strong> ${currentKeys.ecdsaPublic}
✅ secp256k1 (Bitcoin & Ethereum)`;
        document.getElementById('ecdsaKeysOutput').className = 'output success';
    } catch (error) {
        document.getElementById('ecdsaKeysOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('ecdsaKeysOutput').className = 'output error';
    }
}

function signECDSA() {
    try {
        if (!currentKeys.ecdsaKeyPair) throw new Error('請先生成密鑰');
        const message = document.getElementById('ecdsaMessage').value;
        const msgHash = CryptoJS.SHA256(message).toString();
        const signature = currentKeys.ecdsaKeyPair.sign(msgHash);
        currentSignature = { ecdsa: signature, ecdsaMsg: msgHash };
        
        document.getElementById('ecdsaOutput').innerHTML = `
<strong>訊息:</strong> ${message}
<strong>雜湊:</strong> ${msgHash}
<strong>簽名 r:</strong> ${signature.r.toString('hex')}
<strong>簽名 s:</strong> ${signature.s.toString('hex')}
✅ 簽名成功！`;
        document.getElementById('ecdsaOutput').className = 'output success';
    } catch (error) {
        document.getElementById('ecdsaOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('ecdsaOutput').className = 'output error';
    }
}

function verifyECDSA() {
    try {
        if (!currentKeys.ecdsaKeyPair) throw new Error('請先生成密鑰');
        if (!currentSignature || !currentSignature.ecdsa) throw new Error('請先簽署');
        const message = document.getElementById('ecdsaMessage').value;
        const msgHash = CryptoJS.SHA256(message).toString();
        const valid = currentKeys.ecdsaKeyPair.verify(msgHash, currentSignature.ecdsa);
        
        document.getElementById('ecdsaOutput').innerHTML = `
<strong>驗證結果:</strong> ${valid ? '✅ 有效' : '❌ 無效'}`;
        document.getElementById('ecdsaOutput').className = valid ? 'output success' : 'output error';
    } catch (error) {
        document.getElementById('ecdsaOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('ecdsaOutput').className = 'output error';
    }
}

// Ed25519
async function generateEd25519Keys() {
    try {
        const privateKey = new Uint8Array(32);
        crypto.getRandomValues(privateKey);
        const publicKey = await nobleEd25519.getPublicKey(privateKey);
        
        currentKeys.ed25519Private = privateKey;
        currentKeys.ed25519Public = publicKey;
        
        const privHex = Array.from(privateKey).map(b => b.toString(16).padStart(2, '0')).join('');
        const pubHex = Array.from(publicKey).map(b => b.toString(16).padStart(2, '0')).join('');
        
        document.getElementById('ed25519KeysOutput').innerHTML = `
<strong>私鑰:</strong> ${privHex}
<strong>公鑰:</strong> ${pubHex}
✅ Ed25519 (Solana, Cardano)`;
        document.getElementById('ed25519KeysOutput').className = 'output success';
    } catch (error) {
        document.getElementById('ed25519KeysOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('ed25519KeysOutput').className = 'output error';
    }
}

async function signEd25519() {
    try {
        if (!currentKeys.ed25519Private) throw new Error('請先生成密鑰');
        const message = document.getElementById('ed25519Message').value;
        const messageBytes = new TextEncoder().encode(message);
        const signature = await nobleEd25519.sign(messageBytes, currentKeys.ed25519Private);
        currentSignature = { ed25519: signature, ed25519Msg: messageBytes };
        
        const sigHex = Array.from(signature).map(b => b.toString(16).padStart(2, '0')).join('');
        document.getElementById('ed25519Output').innerHTML = `
<strong>訊息:</strong> ${message}
<strong>簽名:</strong> ${sigHex}
✅ 簽名成功！`;
        document.getElementById('ed25519Output').className = 'output success';
    } catch (error) {
        document.getElementById('ed25519Output').innerHTML = `❌ ${error.message}`;
        document.getElementById('ed25519Output').className = 'output error';
    }
}

async function verifyEd25519() {
    try {
        if (!currentKeys.ed25519Public) throw new Error('請先生成密鑰');
        if (!currentSignature || !currentSignature.ed25519) throw new Error('請先簽署');
        const message = document.getElementById('ed25519Message').value;
        const messageBytes = new TextEncoder().encode(message);
        const valid = await nobleEd25519.verify(currentSignature.ed25519, messageBytes, currentKeys.ed25519Public);
        
        document.getElementById('ed25519Output').innerHTML = `
<strong>驗證結果:</strong> ${valid ? '✅ 有效' : '❌ 無效'}`;
        document.getElementById('ed25519Output').className = valid ? 'output success' : 'output error';
    } catch (error) {
        document.getElementById('ed25519Output').innerHTML = `❌ ${error.message}`;
        document.getElementById('ed25519Output').className = 'output error';
    }
}

console.log('🔐 Asymmetric encryption loaded');
