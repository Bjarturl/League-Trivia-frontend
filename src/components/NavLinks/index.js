import React from "react";
import { NavLink } from "react-router-dom";

//Links in the navigation bar to all main parts of the site
export const NavLinks = () => (
  <ul className="nav-links">
    <li>
      <NavLink exact to="/" className="navigation-link">
        {/* <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"></img> */}
      </NavLink>
    </li>
    <li>
    </li>
    {/* <li>
      <NavLink exact to="/" className="navigation-link">
        Home
      </NavLink>
    </li> */}
  </ul>
);

export default NavLinks;
