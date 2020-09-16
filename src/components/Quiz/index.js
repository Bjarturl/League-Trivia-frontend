import React from "react";
import PropTypes from "prop-types";
import HighScores from "../HighScores";
import { GET, POST } from "../../services/api_calls";
import Cookies from "universal-cookie";
class Quiz extends React.Component {
  componentDidMount() {
    GET.sendGetRequest(GET.getRandomQuestion()).then((data) => {
      this.setState({ question: data });
    });
  }
  constructor() {
    super();
    const cookies = new Cookies();
    this.state = {
      question: {
        question: "",
        answer: "",
        possibilities: [],
      },
      answered: [],
      points: 0,
      name: "",
      visibleAns: "",
      isCorrect: null,
      highscore: cookies.get("highscore") ? cookies.get("highscore") : 0,
    };
  }

  getQuestion() {
    GET.sendGetRequest(GET.getRandomQuestion()).then((data) => {
      this.setState({ question: data });
    });
  }

  getNewQuestion() {
    POST.sendPostRequest(POST.getNewRandomQuestion(), JSON.stringify({answered: this.state.answered})).then(data => {
      this.setState({ question: data });
    })
  }

  submitHighScore(points) {
    GET.sendGetRequest(GET.getSecretKey()).then((data) => {
        POST.sendPostRequest(POST.submitHighScore(), JSON.stringify({highscore: points, name: this.state.name, secret: data.secret}))
      });
  }

  evaluateAnswer(ans) {
    const { question } = this.state;
    var answer = "";

    GET.sendGetRequest(GET.getAnswer(question.ans_id))
      .then((data) => {
        answer = data.answer;
      })
      .then(() => {
        const cookies = new Cookies();
        if (ans == answer.toString().split(",")[0]) {
          this.setState({
            points: this.state.points + 1,
            isCorrect: true,
            visibleAns: answer,
            answered: [...this.state.answered, this.state.question.question]
          });
        } else if (answer == "Hey, bannað að svindla! :(") {
          this.setState({
            points: 0,
            isCorrect: null,
            visibleAns: answer,
            answered: []
          });
        } else {
          if (this.state.points > this.state.highscore) {
            this.setState({ highscore: this.state.points });
            cookies.set("highscore", this.state.points, { path: "/" });
          }
          if(confirm("Þú tapaðir:( \n" + "Rétt svar er: " + answer.toString() + "\nÞú ert með " + this.state.points.toString() + " stig. \nViltu skrá þig á high score listann?")) {
              var name = prompt("Skrifaðu nafnið þitt: ")
              console.log(name);
              if(name) {
                  this.setState({ name: name})
                  this.submitHighScore(this.state.points)
              }
          }
          this.setState({
            points: 0,
            answered: []
          });
        }
        this.getNewQuestion();
      });
  }

  render() {
    const { question } = this.state;
    return (
      <div>
        <p>Hæsta skor: {this.state.highscore}</p>
        <p>Stig: {this.state.points}</p>
        <div
          className="quiz"
          style={{
            border: "1px solid black",
            backgroundColor: "lightcyan",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>{question.question}</p>
          {question.possibilities.map((p, i) => (
            <div
              key={i}
              className="hovering"
              onClick={() => {
                this.evaluateAnswer(p);
              }}
              style={{
                margin: "20px",
                height: "60px",
                width: "70%",
                backgroundColor: "lightblue",
              }}
            >
              <p>{p}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 style={{ color: this.state.isCorrect ? "green" : "red" }}>
            <b>
              {this.state.isCorrect != null
                ? this.state.isCorrect
                  ? "Rétt :D"
                  : "Rangt :("
                : ""}
            </b>
          </h3>
          <h3>
            <b>{this.state.visibleAns}</b>
          </h3>
          <HighScores points={this.state.points}/>
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  children: PropTypes.object,
};

export default Quiz;
