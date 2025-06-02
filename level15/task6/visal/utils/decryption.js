const fs = require("fs");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";

function decryptFile(filePath, password) {
    const key = crypto.scryptSync(password, 'salt', 32);

    if (!fs.existsSync(filePath)) {
        throw new Error("❌ File not found for decryption.");
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const [ivHex, encryptedHex] = data.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    fs.writeFileSync("./files/decrypted.txt", decrypted.toString());

    console.log("✅ File decrypted successfully.");
}

module.exports = decryptFile;
