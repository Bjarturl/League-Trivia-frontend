import React from "react";
import PropTypes from "prop-types";

//Displays a modal for handling forms
export const Modal = ({ handleClose, show, title, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={ showHideClassName } style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-container">
        <div className="modal-close-cont" style={{display: "flex", margin: "10px"}}>
          <h1 style={{ display: "flex", justifyContent: "center", width: "100%"}}>{title}</h1>
        <a href="#" className="modal-close" onClick={ handleClose } style={{display: "flex", alignContent: "flex-start", justifyContent: "flex-end"}}>
          {" "}
        <i className="fa fa-times" aria-hidden="true"></i>
          {" "}
        </a>
        </div>
        { children }
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};
export default Modal;
