const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

// File paths for the test file, compressed file, and decompressed file
const sourceFile = path.join(__dirname, "testFile.txt");
const compressedFile = path.join(__dirname, "testFile.txt.gz");
const decompressedFile = path.join(__dirname, "decompressedTestFile.txt");

// Function to compress a file
function compressFile(source, destination) {
    const sourceStream = fs.createReadStream(source);
    const destinationStream = fs.createWriteStream(destination);
    const gzip = zlib.createGzip();

    sourceStream
        .pipe(gzip)
        .pipe(destinationStream)
        .on("finish", () => {
            console.log(`File compressed successfully: ${destination}`);
        })
        .on("error", (err) => {
            console.error("Error during compression:", err.message);
        });
}

// Function to decompress a file
function decompressFile(source, destination) {
    const sourceStream = fs.createReadStream(source);
    const destinationStream = fs.createWriteStream(destination);
    const gunzip = zlib.createGunzip();

    sourceStream
        .pipe(gunzip)
        .pipe(destinationStream)
        .on("finish", () => {
            console.log(`File decompressed successfully: ${destination}`);
        })
        .on("error", (err) => {
            console.error("Error during decompression:", err.message);
        });
}

// Compress the file
compressFile(sourceFile, compressedFile);

// After compression is complete, decompress it
fs.exists(compressedFile, (exists) => {
    if (exists) {
        decompressFile(compressedFile, decompressedFile);
    } else {
        console.error("Compressed file does not exist.");
    }
});
