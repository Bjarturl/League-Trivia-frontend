import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Container from "./components/Container";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h1>Maintenance í gangi</h1>
          {/* <NavigationBar />
          <Container>
            <Switch>
              <Route exact path="/" render={() => <Quiz />} exact />
            </Switch>
          </Container> */}
      </div>
    );
  }
}



export default App;
