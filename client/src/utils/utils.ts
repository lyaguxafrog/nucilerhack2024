async function generateKeyPair() {
  const algorithm = {
      name: "ECDSA",
      namedCurve: "P-256",
  };

  const keyPair = await window.crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);
  const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return { publicKey, privateKey };
}

async function createRegistrationRequest(user_id, username, display_name) {
  // Generate ECDSA key pair
  const keyPair = await generateKeyPair();

  // Construct registration request object
  const registrationRequest = {
      user_id: user_id,
      username: username,
      display_name: display_name,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey
  };

  return registrationRequest;
}
