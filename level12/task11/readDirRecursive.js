const fs = require("fs");
const path = require("path");

// Recursive function to read directories and files
function readDirectoryRecursive(directoryPath) {
    // Read the contents of the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err.message);
            return;
        }

        // Loop through each item in the directory
        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);

            // Get stats for the item
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error("Error getting file stats:", err.message);
                    return;
                }

                if (stats.isDirectory()) {
                    // If it's a directory, log the full path and recurse into it
                    console.log(`Directory: ${filePath}`);
                    readDirectoryRecursive(filePath);
                } else {
                    // If it's a file, log the full path
                    console.log(`File: ${filePath}`);
                }
            });
        });
    });
}

// Specify the root directory to start reading
const rootDirectory = path.join(__dirname, "testDirectory");

// Start reading the directory recursively
readDirectoryRecursive(rootDirectory);
