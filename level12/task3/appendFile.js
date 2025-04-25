const appendToFile = require("./fileAppender");

const fileName = "output.txt";
const content = "i'm 3rd-year B.Tech IT student at SNS College of Engineering, passionate about full-stack development, data science, and AI. You have strong problem-solving and time management skillsMore content here.";

appendToFile(fileName, content, (err) => {
    if (err) {
        console.error("Error appending to file:", err.message);
    } else {
        console.log(`Content appended to '${fileName}': "${content}"`);
    }
});
