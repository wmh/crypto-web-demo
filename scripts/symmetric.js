let currentCiphertext = null;

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

console.log('🔑 Symmetric encryption loaded');
