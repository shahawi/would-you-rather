import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Router } from "react-router-dom/cjs/react-router-dom.min";
import { setAuthedUser } from "../actions/authedUser";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const dispatch = this.props.dispatch;
    dispatch(setAuthedUser(null));
    this.props.history.push("/Login");
  }

  render() {
    var user = this.props.usersArray.filter(
      (e) => e.id === this.props.authedUser
    );
    console.log(user[0]);
    return (
      <div style = {{marginLeft : "10rem", marginBottom:"2rem", marginTop: "2rem"}}>
        <div>{user[0].name}</div>
        <button onClick={this.logout}>Log out</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const usersArray = Object.values(state.users);
  console.log(usersArray);
  return {
    usersArray,
    authedUser: state.authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Logout));
