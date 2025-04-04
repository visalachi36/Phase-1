const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };
  
  export default fetchData;
  