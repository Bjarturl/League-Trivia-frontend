import { API_URL } from "../constants";
export const GET = {

  async sendGetRequest(url) {
    return fetch(url, {
      method: "GET",
      headers: new Headers()
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  getTeams(id) {
    if (id) {
      return API_URL + "teams/" + id;
    }
    return API_URL + "teams";
  },

  getRandomQuestion() {
    return API_URL + "question";
  },

  getPlayers(id) {
    if (id) {
      return API_URL + "players/" + id;
    }
    return API_URL + "players";
  },

  getTournaments(id) {
    if (id) {
      return API_URL + "tournaments/" + id;
    }
    return API_URL + "tournaments";
  },

  getChampions(id) {
    if (id) {
      return API_URL + "champions/" + id;
    }
    return API_URL + "champions";
  },

  getPlayerStats(id) {
    if (id) {
      return API_URL + "playerStats/" + id;
    }
    return API_URL + "playerStats";
  },

  getGameStats(id) {
    if (id) {
      return API_URL + "gameStats/" + id;
    }
    return API_URL + "gameStats";
  },

  getGames(id) {
    if (id) {
      return API_URL + "games/" + id;
    }
    return API_URL + "games";
  },

};
