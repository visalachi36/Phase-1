import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function LocalStorageComponent() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div className="container">
      <h2>Local Storage Example</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Stored Name: {name}</p>
    </div>
  );
}

export default LocalStorageComponent;
