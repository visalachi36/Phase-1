const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

// Paths to the files
const originalFilePath = path.join(__dirname, "original.txt");
const encryptedFilePath = path.join(__dirname, "encrypted.enc");
const decryptedFilePath = path.join(__dirname, "decrypted.txt");

// Encryption and Decryption settings
const algorithm = "aes-256-cbc"; // Encryption algorithm
const password = "securepassword"; // Password for encryption (should be kept safe)

// Generate a key and iv from the password using a secure hash
const key = crypto.scryptSync(password, "salt", 32); // 256-bit key
const iv = crypto.randomBytes(16); // Initialization vector

// Function to encrypt a file
function encryptFile() {
    const readStream = fs.createReadStream(originalFilePath);
    const writeStream = fs.createWriteStream(encryptedFilePath);

    // Create a cipher using the algorithm, key, and iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    // Pipe the input file through the cipher and write to the output file
    readStream.pipe(cipher).pipe(writeStream);

    writeStream.on("finish", () => {
        console.log("File encrypted successfully!");
        // After encryption, append the IV to the encrypted file for later use
        fs.appendFile(encryptedFilePath, iv, (err) => {
            if (err) {
                console.error("Error appending IV to encrypted file:", err.message);
                return;
            }
            console.log("IV appended to the encrypted file.");
        });
    });

    writeStream.on("error", (err) => {
        console.error("Error during encryption:", err.message);
    });
}

// Function to decrypt a file
function decryptFile() {
    // Read the encrypted file, excluding the IV appended at the end
    fs.readFile(encryptedFilePath, (err, encryptedData) => {
        if (err) {
            console.error("Error reading the encrypted file:", err.message);
            return;
        }

        // Extract the IV (last 16 bytes of the file)
        const fileIV = encryptedData.slice(-16);
        const encryptedContent = encryptedData.slice(0, -16);

        // Create a decipher using the same algorithm, key, and extracted IV
        const decipher = crypto.createDecipheriv(algorithm, key, fileIV);
        const decryptedContent = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);

        // Write the decrypted content to the output file
        fs.writeFile(decryptedFilePath, decryptedContent, "utf8", (err) => {
            if (err) {
                console.error("Error writing the decrypted file:", err.message);
                return;
            }
            console.log("File decrypted successfully!");
            verifyDecryptedContent(decryptedContent.toString());
        });
    });
}

// Function to verify if the decrypted content matches the original
function verifyDecryptedContent(decryptedContent) {
    fs.readFile(originalFilePath, "utf8", (err, originalContent) => {
        if (err) {
            console.error("Error reading the original file:", err.message);
            return;
        }

        if (decryptedContent === originalContent) {
            console.log("Decryption successful: The decrypted content matches the original.");
        } else {
            console.error("Decryption failed: The decrypted content does not match the original.");
        }
    });
}

// Encrypt the file
encryptFile();

// After encryption, decrypt the file
setTimeout(() => {
    decryptFile();
}, 1000); // Wait for encryption to finish before decrypting
