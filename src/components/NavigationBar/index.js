import React from "react";
import PropTypes from "prop-types";
import NavLinks from "../NavLinks";
import { connect } from "react-redux";

//The navigation bar for the site, displays links and user thumbnail
export class NavigationBar extends React.Component {
  componentDidMount() {
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

  render() {
    return (
      <div>
        <nav className="navbar">
          <NavLinks />
          <div className="navbar-user-info">
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (reduxStoreState) => {
  return {
  };
};

//Prop validation
NavigationBar.propTypes = {
};

export default connect(mapStateToProps)(NavigationBar);
