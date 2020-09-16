import React from "react";
import PropTypes from "prop-types";
import { GET, POST } from "../../services/api_calls";
class HighScores extends React.Component {
  componentDidMount() {
    this.getHighScores()
  }

  getHighScores() {
    GET.sendGetRequest(GET.getHighScores()).then((data) => {
        this.setState({ highScores: data.highscores, updated: true})
      });
  }

  componentDidUpdate() {
     if(this.props.points == 0 && !this.state.updated) {
        this.getHighScores()
     } else if(this.props.points > 0 && this.state.updated) {
        this.setState({ updated: false})
     }
  }

  constructor() {
    super();
    this.state = {
        highScores: [],
        updated: false
    };
  }

  render() {
      const { highScores } = this.state;
    return (
      <div style={{ marginTop: "10%" }}>
          <h1>Top 10</h1>
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ fontSize: "1.5em", borderBottom: "1px solid black" }}>
              <th>Nafn</th>
              <th>Stig</th>
              <th>Dags.</th>
            </tr>
          </thead>
          <tbody>
            {this.state.highScores.map((s, i) => (
              <tr key={i} style={{ fontSize: "1.5em", marginBottom: "5px" }}>
                <td>{s.name}</td>
                <td>{s.score}</td>
            <td>{s.created_at.split("T")[0]} {s.created_at.split("T")[1].split(".")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

HighScores.propTypes = {
  children: PropTypes.object,
};

export default HighScores;
