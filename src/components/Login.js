import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import "../login.css";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  componentDidMount() {
    if (this.props.authedUser !== null) {
      this.props.history.push(`/Home`);
    }
  }

  handleChange = (e) => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(e.id));
    this.props.history.push(`/Home`);
  };

  render() {
    return (
      <Router>
        <Fragment>
          <div style={{ marginLeft: "13rem", marginTop: "4rem" }}>
            Please login to continue
          </div>
          <div className="main" style={{ outerHeight: "5rem" }}>
            <Select
              style={{
                wordwrap: "break-word",
                wordbreak: "break-all",
                height: "80px",
              }}
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

function mapStateToProps({ users, authedUser }) {
  const usersArray = Object.values(users);
  return {
    usersArray,
    authedUser,
  };
}

export default connect(mapStateToProps)(Login);
