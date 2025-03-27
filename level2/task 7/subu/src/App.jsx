import React from "react";
import Details from "./Details";

const Details = () => {

  const users = [
    { name: "visa", age: "20", city: "Coimbatore" }, 
    { name: "kaviya", age: "22", city: "Bangalore" },
    { name: "niranjan ", age: "21", city: "chennai" },
  ];

  return (
    <div>
      <h2>User Information</h2>
      {users.map((user, index) => (
        <UserDetails key={index} name={user.name} age={user.age} city={user.city} />
      ))}
    </div>
  );
};

export default Details;
