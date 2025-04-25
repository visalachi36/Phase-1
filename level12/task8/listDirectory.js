const fs = require("fs");
const path = require("path");

const currentDir = ".";  // Current directory

// Read the contents of the directory
fs.readdir(currentDir, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err.message);
        return;
    }

    // Loop through each file/directory
    files.forEach((file) => {
        const filePath = path.join(currentDir, file);

        // Get stats of the file/directory
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            console.log(`${file} (Directory)`);
        } else {
            console.log(`${file} (File)`);
        }
    });
});
