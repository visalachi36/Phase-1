const fs = require("fs");
const path = require("path");

// Path to the JSON file
const jsonFilePath = path.join(__dirname, "data.json");

// Read the JSON file
fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading the JSON file:", err.message);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Modify the data (e.g., adding a new object)
        const newObject = {
            id: 4,
            name: "John Doe",
            age: 30,
            occupation: "Developer"
        };

        // Add the new object to the array
        jsonData.push(newObject);

        // Optionally, update an existing object
        // jsonData[0].age = 35; // Update age of the first object

        // Optionally, remove an item
        // jsonData.splice(2, 1); // Remove the third object

        // Write the modified data back to the JSON file
        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
            if (err) {
                console.error("Error writing to the JSON file:", err.message);
                return;
            }

            console.log("JSON file updated successfully!");
        });
    } catch (parseErr) {
        console.error("Error parsing the JSON data:", parseErr.message);
    }
});
