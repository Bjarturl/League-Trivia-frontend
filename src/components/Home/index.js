import React from "react";
import PropTypes from "prop-types";
import { GET } from "../../services/api_calls";
import { Select } from "../Select";
import { Statistics } from "../Statistics";
class Home extends React.Component {
  componentDidMount() {
      GET.sendGetRequest(GET.getTournaments()).then((data) => {
          this.setState({ tournaments: data, tournament: data[0], team: data[0].teams[0] });
        })
  }
  constructor() {
    super();
    this.state = {
      tournaments: [],
      tournament: {id: "", teams: [{name: "", url: ""}], name: ""},
      team: {name: "", url: ""}
    };
  }
  render() {
    var { tournaments, tournament, team } = this.state;
    return (
      <div className="home">
        <h1> Dashboard - {team.name} <img style={{height: "40px"}}src={team.logo}></img></h1>
        <div
          style={{
            width: "30%",
          }}
        >
          <Select
            value={tournament.id}
            onChange={(e) => { this.setState({tournament: tournaments.find(t => t.id == e.target.value)}) }}
            label="Tournament"
            name={tournament.name}
            htmlId="tournament"
            options={tournaments.map(t => {
                return {
                    name: `${t.name} / ${t.season}`,
                    id: t.id
                }
            })}
          />
        <Select
            value={team.url}
            onChange={(e) => { this.setState({team: tournament.teams.find(t => t.url == e.target.value)})}}
            label="Team"
            name={team.name}
            htmlId="team"
            options={tournament.teams.map((t, i) => {
                return {
                    name: t.name,
                    id: t.url
                }
            })}
          />
          <button className="btn btn-primary">Filter</button>
        </div>
        <Statistics team={team} />
      </div>
    );
  }
}

Home.propTypes = {
  children: PropTypes.object,
};

export default Home;
