const crypto = require('crypto');
const key32 = crypto.randomBytes(32);
const key16 = crypto.randomBytes(16);
const key24 = crypto.randomBytes(24);
const iv = crypto.randomBytes(16);
const aes = "aes"
const bulkEncryptionSubType = "cbc"
const key128 = "128"
const key192 = "192"
const key256 = "256"

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function encrypt(text, cipherName, key) {
    let cipher = crypto.createCipheriv(cipherName, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString('hex'),
        input: text,
        encryptedData: encrypted.toString('hex')
    };
}

function decrypt(text, cipherName, key) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(cipherName, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

console.log(crypto.getCiphers())

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

for (let cipherName of crypto.getCiphers()) {
    if (cipherName.indexOf(aes) > -1 && cipherName.indexOf(bulkEncryptionSubType) > -1) {
        console.info(cipherName)
        if (cipherName.indexOf(key256) > -1) {
            key = key32
        } else if (cipherName.indexOf(key192) > -1) {
            key = key24
        } else if (cipherName.indexOf(key128) > -1) {
            key = key16
        }
        var start = new Date()
        for (var i = 0; i < process.argv[2]; i++) {
            var hw = encrypt(makeid(60), cipherName, key)
            decrypt(hw, cipherName, key)
        }
        var end = new Date() - start
        console.info(cipherName, ' Execution time: %dms', end)
        sleep(180000).then(() => {
        });
    }
}
