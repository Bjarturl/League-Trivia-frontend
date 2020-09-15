import React from "react";
import PropTypes from "prop-types";

//Functional component for displaying custom checkboxes
export const Checkbox = ({
  value,
  onChange,
  label,
  name,
  htmlId,
  className,
}) => (
  <div className={"form-group " + className} id={htmlId}>
    {label ? (
      <label htmlFor={htmlId} className="control-label">
        {label} &#160;
      </label>
    ) : (
      <></>
    )}
    <input
      value={value}
      onClick={onChange}
      name={name}
      type="checkbox"
      defaultChecked={value}
    ></input>
  </div>
);

//Prop validation
Checkbox.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  htmlId: PropTypes.string.isRequired,
};

export default Checkbox;
