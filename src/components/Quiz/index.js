import React from "react";
import PropTypes from "prop-types";
import { GET } from "../../services/api_calls";
import Cookies from 'universal-cookie';
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
      points: 0,
      visibleAns: "",
      isCorrect: null,
      highscore: cookies.get('highscore') ? cookies.get('highscore') : 0
    };
  }

  getQuestion() {
    GET.sendGetRequest(GET.getRandomQuestion()).then((data) => {
        this.setState({ question: data });
      });
  }


  evaluateAnswer(ans) {
    const { question } = this.state;
      var answer = ""
    GET.sendGetRequest(GET.getAnswer(question.ans_id)).then((data) => {
         answer = data.answer
      }).then(() => {
        if (ans == answer.toString().split(",")[0]) {
            this.setState({
              points: this.state.points + 1,
              isCorrect: true,
              visibleAns: answer,
            });
          } else if(answer == "Hey, bannað að svindla! :(") {
            this.setState({
                points: 0,
                isCorrect: null,
                visibleAns: answer,
              });
          } else {
              if(this.state.points > this.state.highscore) {
                  this.setState({ highscore: this.state.points})
                  cookies.set('highscore', this.state.points, { path: '/' });
                  console.log(document.cookie);
              }
              this.setState({
                  isCorrect: false,
                  visibleAns: "Rétt svar er: " + answer.toString(),
                  points: 0
              })
          }
          
          this.getQuestion()
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
          <h3 style={{color: this.state.isCorrect ? "green" : "red"}}><b>{this.state.isCorrect != null ? (this.state.isCorrect ? "Rétt :D" : "Rangt :("): ""}</b></h3>
          <h3><b>{this.state.visibleAns}</b></h3>
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  children: PropTypes.object,
};

export default Quiz;
