const fs = require("fs");
const path = require("path");

const fileName = "test.txt"; // specify the file name

// Get file stats
fs.stat(fileName, (err, stats) => {
    if (err) {
        console.error("Error reading file stats:", err.message);
    } else {
        // Convert timestamps to human-readable format
        const creationTime = new Date(stats.birthtime).toLocaleString();
        const modifiedTime = new Date(stats.mtime).toLocaleString();

        console.log(`File: ${fileName}`);
        console.log(`Size: ${stats.size} bytes`);
        console.log(`Created: ${creationTime}`);
        console.log(`Last Modified: ${modifiedTime}`);
    }
});
