const fs = require("fs");

const fileToDelete = "fileToDelete.txt";

// Check if the file exists before attempting to delete it
fs.access(fileToDelete, fs.constants.F_OK, (err) => {
    if (err) {
        console.log(`${fileToDelete} does not exist.`);
    } else {
        // File exists, proceed with deletion
        fs.unlink(fileToDelete, (err) => {
            if (err) {
                console.error("Error deleting file:", err.message);
            } else {
                console.log(`${fileToDelete} has been deleted successfully.`);
            }
        });
    }
});
