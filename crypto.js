const crypto = require('crypto');
const key32 = crypto.randomBytes(32);
const key16 = crypto.randomBytes(16);
const key24 = crypto.randomBytes(24);
const iv = crypto.randomBytes(16);
const key128 = "128"
const key192 = "192"
const key256 = "256"

const repetitionCount = process.argv[2]
cipherName = process.argv[3]

var tag

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function encrypt(text, cipherName, key) {
    let cipher = crypto.createCipheriv(cipherName, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex');
    if (cipherName.indexOf("gcm") > -1) {
        tag = cipher.getAuthTag();
    }
    return {
        iv: iv.toString('hex'),
        input: text,
        encryptedData: encrypted.toString('hex'),
        tag: tag
    };
}

function decrypt(text, cipherName, key) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(cipherName, Buffer.from(key), iv);
    if (cipherName.indexOf("gcm") > -1) {
        decipher.setAuthTag(text.tag);
    }
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted.toString();
}

console.log(crypto.getCiphers())

console.info(cipherName)
if (cipherName.indexOf(key256) > -1) {
    key = key32
} else if (cipherName.indexOf(key192) > -1) {
    key = key24
} else if (cipherName.indexOf(key128) > -1) {
    key = key16
}
var start = new Date()
for (var i = 0; i < repetitionCount; i++) {
    var hw = encrypt(makeid(60), cipherName, key);
    decrypt(hw, cipherName, key);
}
var end = new Date() - start
console.info(cipherName, ' Execution time: %dms', end)
