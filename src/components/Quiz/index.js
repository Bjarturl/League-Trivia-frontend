import React from "react";
import PropTypes from "prop-types";
import HighScores from "../HighScores";
import { GET, POST } from "../../services/api_calls";
import Modal from "../Modal";
import Input from "../Input";
import Cookies from "universal-cookie";
class Quiz extends React.Component {
  componentDidMount() {
    GET.sendGetRequest(GET.getRandomQuestion()).then((data) => {
      this.setState({
        question: data,
        show: this.state.name == "",
      });
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
      name: cookies.get("name") ? cookies.get("name") : "",
      wait: false,
      visibleAns: "",
      correct: null,
      clicked: null,
      highscore: cookies.get("highscore") ? cookies.get("highscore") : 0,
    };
  }

  getQuestion() {
    GET.sendGetRequest(GET.getRandomQuestion()).then((data) => {
      this.setState({ question: data });
    });
  }

  getNewQuestion() {
    POST.sendPostRequest(
      POST.getNewRandomQuestion(),
      JSON.stringify({ answered: this.state.answered })
    ).then((data) => {
      this.setState({ question: data });
    });
  }

  submitHighScore(points) {
    GET.sendGetRequest(GET.getSecretKey()).then((data) => {
      POST.sendPostRequest(
        POST.submitHighScore(),
        JSON.stringify({
          highscore: points,
          name: this.state.name,
          secret: data.secret,
        })
      ).then(res => {
        if(res.scored) {
          this.setState({visibleAns: "Þú tapaðir en komst í topp 10. Til hamingju "  + this.state.name + "!"})
        } else {
          this.setState({visibleAns: "Þú tapaðir! Því miður var skorið þitt ekki nógu hátt til að komast í topp 10. Horfðu á nokkra leiki hjá SiggoTV og reyndu svo aftur."})
        }
      });
    });
  }

  evaluateAnswer(ans, i) {
    const { question } = this.state;
    const cookies = new Cookies();
    var answer = "";
    var timeout = 1500;
    if(this.state.wait) { return;}
    GET.sendGetRequest(GET.getAnswer(question.ans_id))
      .then((data) => {
        answer = data.answer;
      })
      .then(() => {
        this.setState({clicked: i})
        
        if (ans == answer.toString().split(",")[0]) {
          this.setState({
            points: this.state.points + 1,
            correct: i,
            visibleAns: "Rétt! " + answer,
            answered: [...this.state.answered, this.state.question.question],
          });
        } else if (answer == "Hey, bannað að svindla! :(") {
          this.setState({
            points: 0,
            visibleAns: answer,
            answered: [],
          });
        } else {
          timeout = 2500;
          if (this.state.points > this.state.highscore) {
            this.setState({ highscore: this.state.points });
            cookies.set("highscore", this.state.points, { path: "/" });
          }
            if (this.state.name != "") {
              this.submitHighScore(this.state.points);
            }
          this.setState({
            points: 0,
            answered: [],
          });
        }
        this.setWait(timeout)
      });
  }

  setWait(timeout) {
    if(!this.state.wait) {
      this.setState({wait: true})
      setTimeout(() => { 
        this.setState({wait: false, clicked: null, correct: null, visibleAns: ""});
        this.getNewQuestion(); 
      }, timeout);
    }
  }

  //Update field when user types a letter
  onInput(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    const { question } = this.state;
    const cookies = new Cookies();
    return (
      <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
         <h3>Velkomin/nn {this.state.name ? <>{this.state.name}</>: <></>}! </h3>
            <a className="link" onClick={() => {this.setState({show: true})}}> Breyta um nafn</a>
          </div>
        {this.state.name ? <></>: <><strong style={{fontSize: "0.7em"}}>ATH. nafn verður að vera til staðar til að skrá high score.</strong></>}
        <p>Hæsta skor: {this.state.highscore}</p>
        <p>Stig: {this.state.points}</p>
        <div
          className="quiz"
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ color: "white", textShadow: "h-shadow" }}>
            <strong>{question.question}</strong>
          </p>
          <p><b style={{color: "white", backgroundColor: "blue", textShadow: "h-shadow"}}>{this.state.visibleAns}</b></p>
          {question.possibilities.map((p, i) => (
            <div
              key={i}
              className="hovering"
              onClick={() => {
                this.evaluateAnswer(p, i);
              }}
              style={{
                margin: "20px",
                height: "40px",
                width: "60%",
                backgroundColor: this.state.clicked == i ? (this.state.correct == i ? "green" : "red") : "lightyellow",
                opacity: "0.9",
              }}
            >
              <p>{p}</p>
            </div>
          ))}
        </div>
        <div>
        <strong style={{fontSize: "0.7em", fontStyle: "italic", textAlign: "right",display: "flex",justifyContent: "flex-end", width: "100%"}}>
          Spurningar eru úr vikum 1-2 í LoL móti Vodafone deildarinnar haustið 2020. <br />Uppfært í hverri viku.</strong>
          <HighScores points={this.state.points} />

          <Modal //Form popup window
            show={this.state.show}
            title={"Velkomin/nn í LoL trivia!"}
            handleClose={() => {
              this.setState({ show: false, name: "" });
            }}
          >
            <div style={{ marginLeft: "20%", marginRight: "20%" }}>
              <Input
                type="text"
                value={this.state.name}
                name="name"
                htmlId="name"
                label="Nafn: "
                onInput={(e) => this.onInput(e)}
              />
              <button
                className="btn btn-primary"
                style={{ margin: "10px", color: "white" }}
                onClick={() => {
                  this.setState({ show: false });
                  cookies.set("name", this.state.name, { path: "/" });

                }}
              >
                <b>Byrja</b>
              </button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  children: PropTypes.object,
};

export default Quiz;
