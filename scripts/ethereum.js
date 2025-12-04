let currentKeys = {};
let currentSignature = null;

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

console.log('⟠ Ethereum functions loaded');
