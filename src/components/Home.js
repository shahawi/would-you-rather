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
    return (
      <div>
        {this.props.authedUser !== null && (
          <Fragment>
            <div
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
      </div>
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
