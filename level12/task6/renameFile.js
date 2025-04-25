const fs = require("fs");

const oldFileName = "original.txt";
const newFileName = "renamed.txt";

// Rename the file
fs.rename(oldFileName, newFileName, (err) => {
    if (err) {
        console.error("Error renaming file:", err.message);
    } else {
        console.log(`${oldFileName} has been renamed to ${newFileName}`);
    }
});
