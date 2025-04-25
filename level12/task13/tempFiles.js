const fs = require("fs");
const path = require("path");

// Prefix for creating a temporary directory
const tempDirPrefix = path.join(__dirname, "temp-");

// Create a temporary directory
fs.mkdtemp(tempDirPrefix, (err, tempDir) => {
    if (err) {
        console.error("Error creating temporary directory:", err.message);
        return;
    }

    console.log(`Temporary directory created: ${tempDir}`);

    // List of files to create within the temporary directory
    const filesToCreate = ["file1.txt", "file2.txt"];

    // Create and write to each file
    filesToCreate.forEach((fileName) => {
        const filePath = path.join(tempDir, fileName);
        const data = `This is some content for ${fileName}.`;

        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error(`Error writing to ${fileName}:`, err.message);
            } else {
                console.log(`File created: ${filePath}`);
            }
        });
    });
});
