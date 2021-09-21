import React, { Component, Fragment } from "react";
import { handleInitialData } from "../actions/LoadData";
import { connect } from "react-redux";
import Login from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import Home from "./Home";
import Nav from "../UI/Nav";

import Pollpage from "./Pollpage";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

import PollResults from "./PollResults";
import AddNewQuestion from "./AddNewQuestion";
import Leaderboard from "./Leaderboard";
import Logout from "./Logout";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Nav />

          <div style={{ marginBottom: "10rem" }}>
            <LoadingBar />
            <div className="container">
              {this.props.loading === true ? (
                <div></div>
              ) : (
                <div
                  style={{
                    textalign: "center",
                  }}
                >
                  {this.props.authedUser !== null &&
                    this.props.authedUser !== undefined && (
                      <Logout style={{ width: "50%", marginLeft: "10rem" }} />
                    )}

                  <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path={["/Home"]} component={Home} />
                    <Route path="/Login" component={Login} />
                    <Route
                      path="/question/:id"
                      component={Pollpage}
                    />
                    <Route path="/results/:id" component={PollResults} />
                    <Route path="/add" component={AddNewQuestion} />
                    <Route path="/leaderboard" component={Leaderboard} />
                  </Switch>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const usersArray = Object.entries(state.users);
  return {
    loading: usersArray.length === 0,
    usersArray,
    authedUser: state.authedUser,
  };
}

export default connect(mapStateToProps)(App);
