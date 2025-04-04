import { useState } from "react";

// Function that simulates fetching data asynchronously
function fetchData(callback) {
    console.log("Fetching data...");

    setTimeout(() => {
        const mockData = [
            { id: 1, name: "Alice", age: 25 },
            { id: 2, name: "Bob", age: 30 },
            { id: 3, name: "Charlie", age: 22 }
        ];

        callback(mockData); // Call the callback function with the data
    }, 2000); // Simulating a 2-second delay
}

// Component to fetch and display data
const DataFetcher = () => {
    const [data, setData] = useState([]);

    // Callback function to handle fetched data
    function handleData(fetchedData) {
        console.log("Data received:", fetchedData);
        setData(fetchedData);
    }

    return (
        <div className="container">
            <h2>Basic Callback Implementation</h2>
            <button onClick={() => fetchData(handleData)}>Fetch Data</button>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <strong>ID:</strong> {item.id}, <strong>Name:</strong> {item.name}, <strong>Age:</strong> {item.age}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataFetcher;
