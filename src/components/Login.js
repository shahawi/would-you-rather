import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../UI/Nav";
import Select from "react-select";
import '../login.css'

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
        <Nav />
          <div className="main">
            <Select className= 'login_seelct'
              options={ this.props.usersArray}
              getOptionLabel={(user) => user.name}
              getOptionValue={(user) => user.name}
              placeholder='Please select your username'
            />
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
