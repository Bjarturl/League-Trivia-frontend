import React from "react";
import PropTypes from "prop-types";
import { GET } from "../../services/api_calls";
class Bans extends React.Component {
  componentDidMount() {
    GET.sendGetRequest(GET.getGames()).then((data) => {
      this.setState({ games: data });
    });
  }

  constructor() {
    super();
    this.state = {
      games: [],
      team: {},
      games_len: 1
    };
  }

  updateState() {
    if (this.state.team != this.props.team) {
      this.setState({
        team: this.props.team,
        games: this.state.games.filter(
          (d) => d.team.url == this.props.team.url
        ),
      });
    }
  }



  getBanStatistics() {
      var games = this.state.games.filter(g => g.blue_team_stats.team.url == this.state.team.url)
      console.log(games);
    // var games = this.state.games.filter(
    //   (d) => d.team.url == this.props.team.url
    // );
    // if(games.length != this.state.games_len) {
    //     this.setState({ games_len: games.length })
    // }
    // var bans = [].concat.apply(
    //   [],
    //   games.map((s) => s.bans)
    // );
    // var ban_percentage = {};
    // for (var i in bans) {
    //   if (!ban_percentage[bans[i].name]) {
    //     ban_percentage[bans[i].name] = 1;
    //   } else {
    //     ban_percentage[bans[i].name] += 1;
    //   }
    // }

    // return ban_percentage;
  }
  render() {
    const { team } = this.props;
    const { games, games_len } = this.state;
    var bans = this.getBanStatistics();
    return (
      <div className="bans">
        <h2>Favorite bans</h2>
        {/* {Object.keys(bans).map((b) => (
          <p key={b}>
            {b} - {(bans[b] / games_len ) * 100}%
          </p>
        ))} */}
      </div>
    );
  }
}

export default Bans;
