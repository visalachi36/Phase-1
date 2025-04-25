const fs = require("fs");

const fileName = "test.txt";

// Check if the file exists synchronously
if (fs.existsSync(fileName)) {
    console.log(`${fileName} exists.`);
} else {
    console.log(`${fileName} does not exist.`);
}
