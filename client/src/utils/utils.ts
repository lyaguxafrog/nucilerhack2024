function generateChallenge(): Uint8Array {
  const challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);
  return challenge;
 }

async function createCredential(): Promise<PublicKeyCredential | null> {
 const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge: new Uint8Array(generateChallenge()),
    rp: {
      name: "Your App Name"
    },
    user: {
      id: new Uint8Array(generateChallenge()),
      name: "username",
      displayName: "User Display Name"
    },
    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7 // ES256
      }
    ],
    timeout: 60000,
    attestation: "direct"
 };

 try {
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    }) as PublicKeyCredential;

    console.log("Credential created:", credential);
    return credential;
 } catch (error) {
    console.error("Error creating credential:", error);
    return null;
 }
}

createCredential().then(credential => {
 if (credential) {
    console.log("Public Key:", credential.response.getPublickKey());
    console.log("Private Key:", credential.response.getPrivateKey());
    console.log("clientDataJSON:", credential.response.clientDataJSON);
 }
}).catch(console.error);