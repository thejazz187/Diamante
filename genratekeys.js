const crypto = require('crypto');
const fs = require('fs');
const diamante = require('diamnet-sdk');
// Generate RSA keys
function generateKeys() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    // Write the keys to files
    fs.writeFileSync('public_key.pem', publicKey);
    fs.writeFileSync('private_key.pem', privateKey);
    
    console.log('Keys generated and saved!');
}

generateKeys();
