const fs = require("fs");
const path = require("path");

const sourceFile = "source.txt";
const destinationFile = "destination.txt";

// Check if destination file already exists
fs.access(destinationFile, fs.constants.F_OK, (err) => {
    if (err) {
        // File doesn't exist, proceed with copying
        fs.copyFile(sourceFile, destinationFile, (err) => {
            if (err) {
                console.error("Error copying file:", err.message);
            } else {
                console.log(`${sourceFile} has been successfully copied to ${destinationFile}`);
            }
        });
    } else {
        console.log(`${destinationFile} already exists. Cannot copy.`);
    }
});
