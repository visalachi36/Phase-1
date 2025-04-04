const cache = new Map();

export const fetchData = async (url) => {
  if (cache.has(url)) {
    console.log("Returning cached data...");
    return cache.get(url);
  }

  console.log("Fetching new data...");
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
};
