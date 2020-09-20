import React from "react";
import PropTypes from "prop-types";

//Process all properties of an input field
export const Input = ({ value, onInput, type, errorMessage, label, name, htmlId }) => (
  <div className="form-group">
    {label ? (
      <label htmlFor={htmlId} className="control-label" style={{fontSize: "1.1em"}}>
        {label}
      </label>
    ) : (
      <></>
    )}
    <input
      type={type}
      value={value || ""}
      onChange={onInput}
      name={name}
      id={htmlId}
      className="form-control"
    />
    <span className="error">{errorMessage}</span>
  </div>
);

//Prop validation
Input.propTypes = {
  value: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text", "password", "submit", "email", "number"]),
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  htmlId: PropTypes.string.isRequired,
};

export default Input;
