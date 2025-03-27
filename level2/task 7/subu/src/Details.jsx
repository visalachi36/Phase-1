import React from "react";
import PropTypes from "Prop-types"; 

const Details = ({ name, age, city }) => {
  return (
    <div>
      <p>Name:visal {name}</p>
      <p>Age: 20{age}</p>
      <p>City: cbe{city}</p>
    </div>
  );
};


Details.propTypes = {
  name: PropTypes.string.isRequired, 
  age: PropTypes.number.isRequired, 
  city: PropTypes.string.isRequired, 
};

export default Details;
