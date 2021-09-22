import React, { Component, Fragment } from "react";
import { handleInitialData } from "../actions/LoadData";
import { connect } from "react-redux";
import Login from "./Login";
import { Redirect } from "react-router-dom";
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
import Lost from "./Lost";

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
                    <ProtectedRoute
                      authedUser={this.props.authedUser}
                      path={["/Home"]}
                      component={Home}
                    />
                    <Route path="/Login" component={Login} />
                    <ProtectedRoute
                      authedUser={this.props.authedUser}
                      path="/questions/:id"
                      component={Pollpage}
                    />
                    <ProtectedRoute
                      authedUser={this.props.authedUser}
                      path="/results/:id"
                      component={PollResults}
                    />
                    <ProtectedRoute
                      authedUser={this.props.authedUser}
                      path="/add"
                      component={AddNewQuestion}
                    />
                    <ProtectedRoute
                      authedUser={this.props.authedUser}
                      path="/leaderboard"
                      component={Leaderboard}
                    />
                    <Route path="*" component={Lost} />
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

function ProtectedRoute({ component: Component, authedUser, ...restOfProps }) {
  if (authedUser === null) {
    alert("Please login first!!");
  }
  const isAuthenticated = authedUser !== null;
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { sentpath: props.location.pathname },
            }}
          />
        )
      }
    />
  );
}

export default connect(mapStateToProps)(App);
