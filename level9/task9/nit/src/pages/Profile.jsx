import React from "react";
import VirtualizedList from "../components/VirtualizedList";

const Profile = () => {
  return (
    <div>
      <h2>User Profile</h2>
      <VirtualizedList />
    </div>
  );
};

export default React.memo(Profile);
