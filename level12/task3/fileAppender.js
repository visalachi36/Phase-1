const fs = require("fs");
const path = require("path");

function appendToFile(filename, data, callback) {
    const filePath = path.join(__dirname, filename);

    fs.appendFile(filePath, data + "\n", "utf8", (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

module.exports = appendToFile;
