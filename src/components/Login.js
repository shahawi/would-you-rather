import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../UI/Nav";

class Login extends Component {
  componentDidMount() {
    console.log("start", this.props.usersArray[0]);
  }

  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="main">
            <Nav />
            <ul>
              {this.props.usersArray.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users }) {
  const usersArray = Object.values(users);
  return {
    usersArray,
  };
}

export default connect(mapStateToProps)(Login);
