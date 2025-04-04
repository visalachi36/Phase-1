import { useState } from "react";
import "./../styles/UserForm.css"; // Importing CSS

const UserForm = () => {
  // State to manage user object
  const [user, setUser] = useState({ name: "", age: "" });

  // Handler to update state dynamically
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="user-form-container">
      <h2>Update User Info</h2>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Enter name"
        className="input-box"
      />
      <input
        type="number"
        name="age"
        value={user.age}
        onChange={handleChange}
        placeholder="Enter age"
        className="input-box"
      />
      <p className="output-text">Name: {user.name || "N/A"}</p>
      <p className="output-text">Age: {user.age || "N/A"}</p>
    </div>
  );
};

export default UserForm;
