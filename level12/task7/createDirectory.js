const fs = require("fs");
const path = require("path");

const dirName = "new_folder";

// Check if the directory already exists
fs.access(dirName, fs.constants.F_OK, (err) => {
    if (err) {
        // Directory does not exist, create it
        fs.mkdir(dirName, (err) => {
            if (err) {
                console.error("Error creating directory:", err.message);
            } else {
                console.log(`${dirName} has been created successfully.`);
            }
        });
    } else {
        console.log(`${dirName} already exists.`);
    }
});
