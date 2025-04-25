const fs = require("fs");
const path = require("path");

function writeFile(filename, data, callback) {
    const filePath = path.join(__dirname, filename);

    fs.writeFile(filePath, data, "utf8", (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

module.exports = writeFile;
