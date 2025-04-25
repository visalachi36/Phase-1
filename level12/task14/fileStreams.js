const fs = require("fs");
const path = require("path");

const sourceFile = path.join(__dirname, "largeTestFile.txt");
const destinationFile = path.join(__dirname, "copiedFile.txt");

// Get the size of the source file to track progress
fs.stat(sourceFile, (err, stats) => {
    if (err) {
        console.error("Error getting source file stats:", err.message);
        return;
    }

    const totalSize = stats.size;
    let copiedSize = 0;

    // Create a read stream for the source file
    const readStream = fs.createReadStream(sourceFile);

    // Create a write stream for the destination file
    const writeStream = fs.createWriteStream(destinationFile);

    // Track progress during the copying
    readStream.on("data", (chunk) => {
        copiedSize += chunk.length;
        const progress = (copiedSize / totalSize) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
    });

    // Pipe the read stream into the write stream
    readStream.pipe(writeStream);

    // Handle successful completion
    writeStream.on("finish", () => {
        console.log(`File copied successfully to ${destinationFile}`);
    });

    // Handle errors during reading or writing
    readStream.on("error", (err) => {
        console.error("Error reading the source file:", err.message);
    });

    writeStream.on("error", (err) => {
        console.error("Error writing to the destination file:", err.message);
    });
});
