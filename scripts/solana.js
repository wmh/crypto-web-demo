let currentKeys = {};
let currentSignature = null;

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

console.log('◎ Solana functions loaded');
