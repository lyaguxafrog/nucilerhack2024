const keys = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",     // SHA-1, SHA-256, SHA-384, or SHA-512
      publicExponent: new Uint8Array([1, 0, 1]), // 0x03 or 0x010001
      modulusLength: 2048, // 1024, 2048, or 4096
    },
    true,
    ["sign", "verify"],
  );

console.log(keys)

// Export public key
const publicKeyExported = await crypto.subtle.exportKey("spki", keys.publicKey);
const publicKeyString = arrayBufferToBase64(publicKeyExported);

// Export private key
const privateKeyExported = await crypto.subtle.exportKey("pkcs8", keys.privateKey);
const privateKeyString = arrayBufferToBase64(privateKeyExported);

console.log("Public Key:", publicKeyString);
console.log("Private Key:", privateKeyString);

// Function to convert array buffer to base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
