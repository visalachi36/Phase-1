const fs = require("fs");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";

function encryptFile(filePath, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);

    const data = fs.readFileSync(filePath, 'utf8');
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

    const outputPath = "./files/encrypted.enc";
    fs.writeFileSync(outputPath, iv.toString('hex') + ':' + encrypted.toString('hex'));

    console.log("✅ File encrypted successfully.");
}

module.exports = encryptFile;
