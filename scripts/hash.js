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

console.log('🔐 Hash functions loaded');
