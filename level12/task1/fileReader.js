const fs = require("fs");
const path = require("path");

function readFile(filename, callback) {
    const filePath = path.join(__dirname, filename);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports = readFile;
