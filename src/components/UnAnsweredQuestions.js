import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {  withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

class UnansweredQuestions extends Component {
 
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  toPolPage = (e, id) => {
    e.preventDefault();

    this.props.history.push(`/question/${id}`);
  };
  render() {
    const authedUser = this.props.authedUser;
    const user = this.props.users[authedUser];
    const unAnsweredquestions = Object.values(this.props.questions).filter(
      (question) => user.answers.hasOwnProperty(question.id)
    );


    return (
      <Router>
        <div>
          {unAnsweredquestions.map((question) => (
            <div
              className="card"
              style={{
                width: "25rem",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
              key={question.id}
            >
              <div className="card border-primary mb-3">
                <h5 className="card-title">{question.author}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Would you rather
                </h6>
                <p className="card-text" style={{ flex: 1, flexWrap: "wrap" }}>
                  {" "}
                  {question.optionOne.text} or ....
                </p>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={(e) => this.toPolPage(e, question.id)}
                >
                  View poll
                </button>
              </div>
            </div>
          ))}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state,props) {
    const { history } = props;
  return {
    questions: state.questions,
    users: state.users,
    authedUser: state.authedUser,
    history
  };
}

export default withRouter(connect(mapStateToProps)(UnansweredQuestions));
