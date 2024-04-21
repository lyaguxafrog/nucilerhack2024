// Генерация ключей

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


const user_id = "zxc";

// функция для шифровки приватного ключа input - publicKeyString key - user_id
function encryptStringWithXORtoHex(input,key) {
  var c = '';
  while (key.length < input.length) {
       key += key;
  }
  for(var i=0; i<input.length; i++) {
      var value1 = input[i].charCodeAt(0);
      var value2 = key[i].charCodeAt(0);

      var xorValue = value1 ^ value2;

      var xorValueAsHexString = xorValue.toString("16");

      if (xorValueAsHexString.length < 2) {
          xorValueAsHexString = "0" + xorValueAsHexString;
      }

      c += xorValueAsHexString;
  }
  return c;
}

// функция для рассшифровки input - зашифрованный publicKeyString key - user_id
function decryptStringWithXORFromHex(input, key) {
  let c = '';
  while (key.length < input.length / 2) {
      key += key;
  }

  for (let i = 0; i < input.length; i += 2) {
      let hexValueString = input.substring(i, i + 2);
      let value1 = parseInt(hexValueString, 16);
      let value2 = key.charCodeAt(i / 2);

      let xorValue = value1 ^ value2;

      c += String.fromCharCode(xorValue);
  }
  return c;
}



// Создание подписи
// получает на вход message и подписывает приватным ключом 

async function signMessage(message, privateKey) {
  // Convert message to ArrayBuffer
  const encoder = new TextEncoder();
  const messageBuffer = encoder.encode(message);

  // Sign the message using the private key
  const signature = await crypto.subtle.sign(
    {
      name: "RSASSA-PKCS1-v1_5",
    },
    privateKey,
    messageBuffer
  );

  // Convert signature to base64
  const signatureBase64 = arrayBufferToBase64(signature);

  return signatureBase64;
}

/*  Пример юза
const privateKey = await crypto.subtle.importKey(
  "pkcs8",
  privateKeyExported,
  {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
  },
  true,
  ["sign"]
);

const message = "Your message here";
const signature = await signMessage(message, privateKey);
console.log("Signature:", signature);

*/

// Функция обновления прайват кея из облака
// на вход дается зашифрованное через xor строка, ее расшифровываем и обновляем   privateKey
// PASS