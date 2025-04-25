const fs = require("fs");
const path = require("path");

// Path to the CSV file
const csvFilePath = path.join(__dirname, "data.csv");
const outputFilePath = path.join(__dirname, "processedResults.csv");

// Read the CSV file
fs.readFile(csvFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading the CSV file:", err.message);
        return;
    }

    try {
        // Parse the CSV data into rows
        const rows = data.trim().split("\n");

        // Extract header and data rows
        const header = rows[0].split(",");
        const records = rows.slice(1).map(row => row.split(","));

        // Assuming that numerical data starts from the second column (index 1)
        const numericalData = records.map(record => record.slice(1).map(Number));

        // Calculate the averages for each column
        const averages = numericalData[0].map((_, colIndex) => {
            const sum = numericalData.reduce((acc, record) => acc + record[colIndex], 0);
            return sum / numericalData.length;
        });

        // Find the max and min values for each column
        const maxValues = numericalData[0].map((_, colIndex) => {
            return Math.max(...numericalData.map(record => record[colIndex]));
        });

        const minValues = numericalData[0].map((_, colIndex) => {
            return Math.min(...numericalData.map(record => record[colIndex]));
        });

        // Prepare the results to write into the new CSV file
        const resultData = [
            ["Metric", ...header.slice(1)],
            ["Max", ...maxValues],
            ["Min", ...minValues],
            ["Average", ...averages]
        ];

        // Convert the result data into CSV format
        const resultCsv = resultData.map(row => row.join(",")).join("\n");

        // Write the results to the output file
        fs.writeFile(outputFilePath, resultCsv, "utf8", (err) => {
            if (err) {
                console.error("Error writing to the CSV file:", err.message);
                return;
            }

            console.log("Processed CSV file created successfully!");
        });

    } catch (parseErr) {
        console.error("Error parsing the CSV data:", parseErr.message);
    }
});
