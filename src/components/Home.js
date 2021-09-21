import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "../Home.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { _formatQuestion } from "../_Data";
import UnAnsweredQuestions from "./UnAnsweredQuestions";
import AnsweredQuestions from "./AnsweredQuestions";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

class Home extends Component {
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    }
  }

  toPolPage = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`);
  };
  render() {
    const unAnsweredquestions = Object.values(this.props.questions).filter(
      (question) => question.answers !== null
    );
    const answeredquestions = Object.values(this.props.questions).filter(
      (question) => question.answers === null
    );

    const formattedQuestion = (question) =>
      _formatQuestion(question.optionOne, question.optionTwo, question.author);
    return (
      <Router>
        {this.props.authedUser !== null && (
          <Fragment>
            <nav>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#a">
                    unAnsweredquestions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#b">
                    answeredquestions
                  </a>
                </li>
              </ul>
            </nav>
            <div
              className="tab-content"
              style={{
                marginLeft: "10rem",
              }}
            >
              <Switch>
                <UnAnsweredQuestions />

                <AnsweredQuestions />
              </Switch>
            </div>
          </Fragment>
        )}
      </Router>
    );
  }
}

function mapStateToProps(state, { id }) {
  const question = state.questions[id];
  // const formattedQuestion =  _formatQuestion(question1.optionOne,question1.optionTwo,question1.author)
  return {
    authedUser: state.authedUser,
    questions: state.questions,
    question,
  };
}

export default connect(mapStateToProps)(Home);
