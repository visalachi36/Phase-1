const readFile = require("./fileReader");

const fileName = "sample.txt";

readFile(fileName, (err, data) => {
    if (err) {
        console.error("Error reading file:", err.message);
    } else {
        console.log("File contents:\n", data);
    }
});
