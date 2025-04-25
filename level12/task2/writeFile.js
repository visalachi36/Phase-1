const writeFile = require("./fileWriter");

const fileName = "output.txt";
const content = "Hello, Node.js!";

writeFile(fileName, content, (err) => {
    if (err) {
        console.error("Error writing to file:", err.message);
    } else {
        console.log(`File '${fileName}' has been created with content: "${content}"`);
    }
});
