const fs = require("fs");
const path = require("path");

const directoryToWatch = path.join(__dirname, "testDirectory");
const logFile = path.join(__dirname, "changeLog.txt");

// Function to log changes to a file and print to console
function logChange(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    // Append the change to the log file
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) {
            console.error("Error writing to log file:", err.message);
        }
    });

    // Print the change to the console
    console.log(message);
}

// Function to monitor a directory for changes
function watchDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.error("Directory does not exist:", directory);
        return;
    }

    fs.watch(directory, { recursive: true }, (eventType, filename) => {
        if (filename) {
            const fullPath = path.join(directory, filename);

            switch (eventType) {
                case "rename":
                    // Check if it's a creation or deletion
                    fs.access(fullPath, fs.constants.F_OK, (err) => {
                        if (err) {
                            logChange(`File deleted: ${filename}`);
                        } else {
                            logChange(`File created: ${filename}`);
                        }
                    });
                    break;
                case "change":
                    logChange(`File modified: ${filename}`);
                    break;
                default:
                    logChange(`Unknown event on file: ${filename}`);
                    break;
            }
        } else {
            logChange("Filename not provided for change event.");
        }
    });

    console.log(`Watching directory: ${directory}`);
}

// Start watching the directory
watchDirectory(directoryToWatch);
