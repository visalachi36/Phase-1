import React from "react";

const Header = ({ title }) => {
  console.log("Rendering Header...");
  return <h1>{title}</h1>;
};

export default React.memo(Header);
