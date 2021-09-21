import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

class Leaderboard extends Component {
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    }
  }
  render() {
    var usersArray = this.props.usersArray;
    usersArray.sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length)
    );

    return (
      <Router>
        {this.props.authedUser !== null && (
          <Fragment>
            <div
              style={{
                marginLeft: "10rem",
              }}
            >
              <div>
                {this.props.usersArray.map((user) => (
                  <div
                    className="card"
                    style={{
                      width: "25rem",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                    key={user.id}
                  >
                    <div className="card border-primary mb-3">
                      <h5 className="card-title">{user.name}</h5>
                      <img
                        alt="avatar"
                        src={`${user.avatarURL}`}
                        height="60px"
                        width="60px"
                      ></img>
                      <h6 className="card-subtitle mb-2 text-muted">Score</h6>

                      <li>
                        Number of asked questions: {user.questions.length}
                      </li>

                      <li>
                        Number of answers : {Object.keys(user.answers).length}
                      </li>

                      <li>
                        Totol score :{" "}
                        {user.questions.length +
                          Object.keys(user.answers).length}
                      </li>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        )}
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

export default connect(mapStateToProps)(Leaderboard);
