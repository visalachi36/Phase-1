import { useState } from "react";

// Function that simulates fetching data using Promises
function fetchDataPromise() {
    console.log("Fetching data...");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = [
                { id: 1, name: "Alice", age: 25 },
                { id: 2, name: "Bob", age: 30 },
                { id: 3, name: "Charlie", age: 22 }
            ];

            // Simulating a success case
            resolve(mockData);

            // Uncomment below to simulate an error case
            // reject("Error: Unable to fetch data");
        }, 2000);
    });
}

// Component to fetch and display data using async/await
const DataFetcherAsync = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Async function to fetch data
    async function fetchDataAsync() {
        try {
            console.log("Fetching data using async/await...");
            const fetchedData = await fetchDataPromise(); // Await the resolved promise
            console.log("Data received:", fetchedData);
            setData(fetchedData);
            setError(null); // Reset error state
        } catch (err) {
            console.error(err);
            setError(err);
            setData([]); // Reset data state
        }
    }

    return (
        <div className="container">
            <h2>Async/Await Data Fetching</h2>
            <button onClick={fetchDataAsync}>Fetch Data</button>

            {error && <p className="error">{error}</p>}

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

export default DataFetcherAsync;
