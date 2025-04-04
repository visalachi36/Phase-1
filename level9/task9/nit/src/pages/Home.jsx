import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header title="Welcome to Home Page" />
      <p>This is the home page content.</p>
    </div>
  );
};

export default React.memo(Home);
