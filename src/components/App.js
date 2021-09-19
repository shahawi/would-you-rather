import React, { Component, Fragment } from "react";
import { handleInitialData } from "../actions/LoadData";
import { connect } from "react-redux";
import Login from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from 'react-redux-loading'
import { getInitialData } from '../Utils/FetchApi'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className="container">
            {this.props.loading === true ? <div>Null</div> : (
              <div>
                <Route path="/" exact component={Login} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({users}) {

  const usersArray = Object.entries(users)
  return {
    loading: usersArray.length===0,
  users
  }
}

export default connect(mapStateToProps)(App);
