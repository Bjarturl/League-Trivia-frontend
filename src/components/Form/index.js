import React from "react";
import PropTypes from "prop-types";

//Process forms
export const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="form form-horizontal">
    { children }
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired, //No point in having a form without inputs
};

export default Form;
