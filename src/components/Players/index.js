import React from "react";
import PropTypes from "prop-types";
import { GET } from "../../services/api_calls";
class Players extends React.Component {
  componentDidMount() {
    GET.sendGetRequest(GET.getPlayers()).then((data) => {
        this.setState({ players: data })
    })
  }
  constructor() {
    super();
    this.state = {
        players: []
    };
  }
  render() {
      const { team } = this.props;
      const { players } = this.state;
    return (
      <div className="players">
          <h2>Roster</h2>
          {players.filter(p => p.team.url == team.url).map(p => (
              <p key={p.id}><a style={{color: "blue", textDecoration: "underline"}} href={"https://euw.op.gg/summoner/userName=" + p.ign}>{p.ign}</a> ({p.name})</p>
          ))}
      </div>
    );
  }
}


export default Players;
