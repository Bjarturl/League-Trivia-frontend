import React from "react";
import PropTypes from "prop-types";

//Functional component for displaying a drop down list
export const Select = ({
  value,
  onChange,
  errorMessage,
  label,
  name,
  htmlId,
  options,
}) => (
  <div className="form-group">
    {label ? (
      <label htmlFor={htmlId} className="control-label">
        {label}
      </label>
    ) : (
      <></>
    )}
    <select
      value={value || ""}
      onChange={onChange}
      name={name}
      id={htmlId}
      className="form-control"
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>{o.name}</option>
      ))}
    </select>
    <span className="error">{errorMessage}</span>
  </div>
);

//Prop validation
Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  htmlId: PropTypes.string.isRequired,
  options: PropTypes.array
};

export default Select;
