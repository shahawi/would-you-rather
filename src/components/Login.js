import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../UI/Nav";
import Select from "react-select";
import "../login.css";
import { setAuthedUser } from '../actions/authedUser'



class Login extends Component {



  componentDidMount() {
    console.log("start", this.props.usersArray[0]);
  }

  handleChange = (e) => {
    console.log("login id", e.id);
    const {dispatch} = this.props
    dispatch(setAuthedUser(e.id))
    this.props.history.push(`/Home`)
    
  };

  render() {
    return (
      <Router>
        <Fragment>
          <Nav />
          <div className="main">
            <Select
              className="login_seelct"
              options={this.props.usersArray}
              onChange={this.handleChange}
              getOptionLabel={(user) => user.name}
              getOptionValue={(user) => user.name}
              placeholder="Please select your username"
            />
            </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users,authedUser }) {
  const usersArray = Object.values(users);
  return {
    usersArray,
    authedUser
  };
}

export default connect(mapStateToProps)(Login);
