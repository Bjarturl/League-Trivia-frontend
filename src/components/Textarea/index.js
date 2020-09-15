import React from "react";
import PropTypes from "prop-types";

//Process all properties of a text area field
export const Textarea = ({ 
  value,
  onInput,
  type,
  errorMessage,
  label,
  name,
  htmlId,
  rows,
}) => (
  <div className="form-group">
    { label ? (
      <label htmlFor={ htmlId } className="control-label">
        { label }
      </label>
    ) : (
      <></>
    ) }
    <textarea
      type={ type }
      value={ value || "" }
      onChange={ onInput }
      name={ name }
      id={ htmlId }
      rows={ rows }
      className="form-control"
    />
    <span className="error">{ errorMessage }</span>
  </div>
);

//Prop validation
Textarea.propTypes = { 
  value: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text", "number"]),
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  htmlId: PropTypes.string.isRequired,
};

export default Textarea;
