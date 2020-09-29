import React from "react";
import PropTypes from "prop-types";
import Players from "../Players";
import Bans from "../Bans";

//Functional component for displaying a drop down list
export const Statistics = ({ team }) => {
  return (
    <div
      className="statistics"
      style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "0.5fr 0.5fr"}}
    >
      <Players team={team} />
      <Bans team={team} />
    </div>
  );
};

export default Statistics;
