import React from "react";
import PropTypes from "prop-types";

//Functional component for the page content
export const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.object,
};

export default Container;
