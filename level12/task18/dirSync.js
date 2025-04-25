const fs = require("fs");
const path = require("path");

// Paths to the source and target directories
const sourceDir = path.join(__dirname, "source");
const targetDir = path.join(__dirname, "target");

// Function to synchronize two directories
function syncDirectories(source, target) {
    fs.readdir(source, (err, sourceFiles) => {
        if (err) {
            console.error("Error reading source directory:", err.message);
            return;
        }

        fs.readdir(target, (err, targetFiles) => {
            if (err) {
                console.error("Error reading target directory:", err.message);
                return;
            }

            // Iterate over the source files
            sourceFiles.forEach((file) => {
                const sourceFilePath = path.join(source, file);
                const targetFilePath = path.join(target, file);

                fs.stat(sourceFilePath, (err, sourceStat) => {
                    if (err) {
                        console.error("Error reading file stats for source file:", err.message);
                        return;
                    }

                    fs.stat(targetFilePath, (err, targetStat) => {
                        if (err || !targetStat) {
                            // File does not exist in target directory, so copy it
                            if (err && err.code === "ENOENT") {
                                copyFile(sourceFilePath, targetFilePath);
                            }
                        } else {
                            // If the file exists in both source and target, check if it's updated
                            if (sourceStat.mtime > targetStat.mtime) {
                                updateFile(sourceFilePath, targetFilePath);
                            }
                        }
                    });
                });
            });

            // Check for files that need to be deleted in the target directory
            targetFiles.forEach((file) => {
                const targetFilePath = path.join(target, file);
                const sourceFilePath = path.join(source, file);

                if (!sourceFiles.includes(file)) {
                    deleteFile(targetFilePath);
                }
            });
        });
    });
}

// Function to copy a file from source to target
function copyFile(sourceFilePath, targetFilePath) {
    fs.copyFile(sourceFilePath, targetFilePath, (err) => {
        if (err) {
            console.error("Error copying file:", err.message);
            return;
        }
        console.log(`File copied: ${path.basename(sourceFilePath)}`);
    });
}

// Function to update a file in the target directory
function updateFile(sourceFilePath, targetFilePath) {
    fs.copyFile(sourceFilePath, targetFilePath, (err) => {
        if (err) {
            console.error("Error updating file:", err.message);
            return;
        }
        console.log(`File updated: ${path.basename(sourceFilePath)}`);
    });
}

// Function to delete a file from the target directory
function deleteFile(targetFilePath) {
    fs.unlink(targetFilePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err.message);
            return;
        }
        console.log(`File deleted: ${path.basename(targetFilePath)}`);
    });
}

// Run the synchronization process
syncDirectories(sourceDir, targetDir);
