// Global variables
let currentKeys = {};
let currentSignature = null;
let currentCiphertext = null;

// Tab switching
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Hash functions
function hashSHA256() {
    const input = document.getElementById('sha256Input').value;
    const hash = CryptoJS.SHA256(input).toString();
    document.getElementById('sha256Output').innerHTML = `
<strong>輸入:</strong> ${input}
<strong>SHA-256:</strong> ${hash}
<strong>長度:</strong> ${hash.length * 4} bits`;
}

function hashSHA3() {
    const input = document.getElementById('sha3Input').value;
    const hash = CryptoJS.SHA3(input, { outputLength: 256 }).toString();
    document.getElementById('sha3Output').innerHTML = `
<strong>輸入:</strong> ${input}
<strong>Keccak-256:</strong> ${hash}`;
}

function hashRIPEMD160() {
    const input = document.getElementById('ripemdInput').value;
    const hash = CryptoJS.RIPEMD160(input).toString();
    document.getElementById('ripemdOutput').innerHTML = `
<strong>輸入:</strong> ${input}
<strong>RIPEMD-160:</strong> ${hash}`;
}

// AES Encryption
function encryptAES() {
    try {
        const plaintext = document.getElementById('aesPlaintext').value;
        const password = document.getElementById('aesPassword').value;
        const ciphertext = CryptoJS.AES.encrypt(plaintext, password).toString();
        currentCiphertext = ciphertext;
        document.getElementById('aesOutput').innerHTML = `
<strong>原文:</strong> ${plaintext}
<strong>加密後:</strong> ${ciphertext}`;
        document.getElementById('aesOutput').className = 'output success';
    } catch (error) {
        document.getElementById('aesOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('aesOutput').className = 'output error';
    }
}

function decryptAES() {
    try {
        const password = document.getElementById('aesPassword').value;
        const bytes = CryptoJS.AES.decrypt(currentCiphertext, password);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        document.getElementById('aesOutput').innerHTML = `
<strong>解密後:</strong> ${plaintext}
✅ 解密成功！`;
        document.getElementById('aesOutput').className = 'output success';
    } catch (error) {
        document.getElementById('aesOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('aesOutput').className = 'output error';
    }
}

function encryptChaCha() {
    const plaintext = document.getElementById('chachaPlaintext').value;
    const password = document.getElementById('chachaPassword').value;
    const ciphertext = CryptoJS.AES.encrypt(plaintext, password).toString();
    currentCiphertext = ciphertext;
    document.getElementById('chachaOutput').innerHTML = `
<strong>加密後:</strong> ${ciphertext}
⚠️ 瀏覽器使用 AES 模擬`;
    document.getElementById('chachaOutput').className = 'output success';
}

function decryptChaCha() {
    const password = document.getElementById('chachaPassword').value;
    const bytes = CryptoJS.AES.decrypt(currentCiphertext, password);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    document.getElementById('chachaOutput').innerHTML = `
<strong>解密後:</strong> ${plaintext}`;
    document.getElementById('chachaOutput').className = 'output success';
}

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

// Ethereum
function generateEthWallet() {
    try {
        const wallet = ethers.Wallet.createRandom();
        currentKeys.ethWallet = wallet;
        
        document.getElementById('ethWalletOutput').innerHTML = `
<strong>助記詞:</strong> ${wallet.mnemonic.phrase}
<strong>私鑰:</strong> ${wallet.privateKey}
<strong>地址:</strong> ${wallet.address}
✅ Ethereum 錢包生成成功！`;
        document.getElementById('ethWalletOutput').className = 'output success';
    } catch (error) {
        document.getElementById('ethWalletOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('ethWalletOutput').className = 'output error';
    }
}

async function signEthMessage() {
    try {
        if (!currentKeys.ethWallet) throw new Error('請先生成錢包');
        const message = document.getElementById('ethMessage').value;
        const signature = await currentKeys.ethWallet.signMessage(message);
        currentSignature = { eth: signature, ethMsg: message };
        
        document.getElementById('ethMessageOutput').innerHTML = `
<strong>訊息:</strong> ${message}
<strong>簽名:</strong> ${signature}
✅ 簽名成功！`;
        document.getElementById('ethMessageOutput').className = 'output success';
    } catch (error) {
        document.getElementById('ethMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('ethMessageOutput').className = 'output error';
    }
}

async function verifyEthMessage() {
    try {
        if (!currentSignature || !currentSignature.eth) throw new Error('請先簽署');
        const message = document.getElementById('ethMessage').value;
        const recoveredAddress = ethers.verifyMessage(message, currentSignature.eth);
        const isValid = recoveredAddress.toLowerCase() === currentKeys.ethWallet.address.toLowerCase();
        
        document.getElementById('ethMessageOutput').innerHTML = `
<strong>恢復地址:</strong> ${recoveredAddress}
<strong>原始地址:</strong> ${currentKeys.ethWallet.address}
<strong>驗證:</strong> ${isValid ? '✅ 有效' : '❌ 無效'}`;
        document.getElementById('ethMessageOutput').className = isValid ? 'output success' : 'output error';
    } catch (error) {
        document.getElementById('ethMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('ethMessageOutput').className = 'output error';
    }
}

async function signEIP712() {
    try {
        if (!currentKeys.ethWallet) throw new Error('請先生成錢包');
        
        const domain = { name: 'My DApp', version: '1', chainId: 1 };
        const types = { Mail: [{ name: 'contents', type: 'string' }] };
        const value = { contents: 'Hello, EIP-712!' };
        
        const signature = await currentKeys.ethWallet.signTypedData(domain, types, value);
        
        document.getElementById('eip712Output').innerHTML = `
<strong>Domain:</strong> ${JSON.stringify(domain)}
<strong>Value:</strong> ${JSON.stringify(value)}
<strong>簽名:</strong> ${signature}
✅ EIP-712 簽名成功！`;
        document.getElementById('eip712Output').className = 'output success';
    } catch (error) {
        document.getElementById('eip712Output').innerHTML = `❌ ${error.message}`;
        document.getElementById('eip712Output').className = 'output error';
    }
}

async function createEthTransaction() {
    try {
        if (!currentKeys.ethWallet) throw new Error('請先生成錢包');
        
        const toAddress = document.getElementById('ethToAddress').value;
        const amount = document.getElementById('ethAmount').value;
        
        const tx = {
            to: toAddress,
            value: ethers.parseEther(amount),
            chainId: 1,
            nonce: 0,
            gasLimit: 21000,
            maxFeePerGas: ethers.parseUnits('50', 'gwei'),
            type: 2
        };
        
        const signedTx = await currentKeys.ethWallet.signTransaction(tx);
        
        document.getElementById('ethTxOutput').innerHTML = `
<strong>From:</strong> ${currentKeys.ethWallet.address}
<strong>To:</strong> ${toAddress}
<strong>Amount:</strong> ${amount} ETH
<strong>Signed TX:</strong> ${signedTx.substring(0, 100)}...
✅ 交易已簽署！`;
        document.getElementById('ethTxOutput').className = 'output success';
    } catch (error) {
        document.getElementById('ethTxOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('ethTxOutput').className = 'output error';
    }
}

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

// Solana
function generateSolWallet() {
    try {
        const keypair = solanaWeb3.Keypair.generate();
        currentKeys.solKeypair = keypair;
        
        document.getElementById('solWalletOutput').innerHTML = `
<strong>公鑰:</strong> ${keypair.publicKey.toString()}
<strong>私鑰:</strong> [${Array.from(keypair.secretKey).slice(0, 4).join(',')}...]
✅ Solana 錢包生成成功！`;
        document.getElementById('solWalletOutput').className = 'output success';
    } catch (error) {
        document.getElementById('solWalletOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('solWalletOutput').className = 'output error';
    }
}

function signSolMessage() {
    try {
        if (!currentKeys.solKeypair) throw new Error('請先生成錢包');
        const message = document.getElementById('solMessage').value;
        const messageBytes = new TextEncoder().encode(message);
        const signature = nacl.sign.detached(messageBytes, currentKeys.solKeypair.secretKey);
        currentSignature = { sol: signature, solMsg: messageBytes };
        
        document.getElementById('solMessageOutput').innerHTML = `
<strong>訊息:</strong> ${message}
<strong>簽名:</strong> ${bs58.encode(signature)}
✅ 簽名成功！`;
        document.getElementById('solMessageOutput').className = 'output success';
    } catch (error) {
        document.getElementById('solMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('solMessageOutput').className = 'output error';
    }
}

function verifySolMessage() {
    try {
        if (!currentKeys.solKeypair) throw new Error('請先生成錢包');
        if (!currentSignature || !currentSignature.sol) throw new Error('請先簽署');
        const message = document.getElementById('solMessage').value;
        const messageBytes = new TextEncoder().encode(message);
        const valid = nacl.sign.detached.verify(messageBytes, currentSignature.sol, currentKeys.solKeypair.publicKey.toBytes());
        
        document.getElementById('solMessageOutput').innerHTML = `
<strong>驗證:</strong> ${valid ? '✅ 有效' : '❌ 無效'}`;
        document.getElementById('solMessageOutput').className = valid ? 'output success' : 'output error';
    } catch (error) {
        document.getElementById('solMessageOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('solMessageOutput').className = 'output error';
    }
}

function createSolTransaction() {
    try {
        if (!currentKeys.solKeypair) throw new Error('請先生成錢包');
        const toAddress = document.getElementById('solToAddress').value;
        const amount = document.getElementById('solAmount').value;
        
        const toPubkey = new solanaWeb3.PublicKey(toAddress);
        const lamports = amount * solanaWeb3.LAMPORTS_PER_SOL;
        const instruction = solanaWeb3.SystemProgram.transfer({
            fromPubkey: currentKeys.solKeypair.publicKey,
            toPubkey: toPubkey,
            lamports: lamports
        });
        
        const transaction = new solanaWeb3.Transaction().add(instruction);
        transaction.recentBlockhash = 'H'.repeat(44);
        transaction.feePayer = currentKeys.solKeypair.publicKey;
        transaction.sign(currentKeys.solKeypair);
        
        document.getElementById('solTxOutput').innerHTML = `
<strong>From:</strong> ${currentKeys.solKeypair.publicKey.toString()}
<strong>To:</strong> ${toAddress}
<strong>Amount:</strong> ${amount} SOL
✅ 交易已簽署！`;
        document.getElementById('solTxOutput').className = 'output success';
    } catch (error) {
        document.getElementById('solTxOutput').innerHTML = `❌ ${error.message}`;
        document.getElementById('solTxOutput').className = 'output error';
    }
}

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

console.log('🔐 Crypto Demo Loaded');
