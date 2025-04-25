const fs = require("fs");
const path = require("path");

const tempDirPrefix = path.join(__dirname, "temp-");

// Create a temporary directory
fs.mkdtemp(tempDirPrefix, (err, tempDir) => {
    if (err) {
        console.error("Error creating temporary directory:", err.message);
        return;
    }

    console.log(`Temporary directory created: ${tempDir}`);

    // Create multiple files within the temporary directory
    const filesToCreate = ["file1.txt", "file2.txt", "file3.txt"];
    filesToCreate.forEach((fileName, index) => {
        const filePath = path.join(tempDir, fileName);
        
        // Write some data to each file
        const data = `This is content for ${fileName}. Created at index ${index + 1}.`;

        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error(`Error writing to ${fileName}:`, err.message);
            } else {
                console.log(`File created: ${filePath}`);
            }
        });
    });
});
