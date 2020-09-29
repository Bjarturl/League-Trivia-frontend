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

  getSecretKey() {
    return API_URL + "secret";
  },

  getRandomQuestion() {
    return API_URL + "question";
  },

  getAnswer(id) {
    return API_URL + "answer/" + id ;
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

  getHighScores() {
    return API_URL + "get_high_scores";
  },

  getGames(id) {
    if (id) {
      return API_URL + "games/" + id;
    }
    return API_URL + "games";
  },

};

export const POST = {
  async sendPostRequest(url, body) {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },
  
  submitHighScore() {
    return API_URL + "add_high_score/"
  },
  
  getNewRandomQuestion() {
    return API_URL + "new_question";
  },

}