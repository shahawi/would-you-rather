import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "../Home.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";



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

    const authedUser = this.props.authedUser;
    const user = this.props.users[authedUser];
    const unAnsweredquestions = Object.values(this.props.questions).filter(
      (question) => user.answers.hasOwnProperty(question.id)
    );

    const answeredquestions = Object.values(this.props.questions).filter(
      (question) => !user.answers.hasOwnProperty(question.id)
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
              <Tabs>
                <TabList>
                  <Tab>Unanswered Questions</Tab>
                  <Tab>AnsweredQuestions</Tab>
                </TabList>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
                <div>
        {answeredquestions.map((question) => (
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
      </div>                </TabPanel>
              </Tabs>
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
    questions: state.questions,
    users: state.users,
    authedUser: state.authedUser,
    question
  };
}

export default (connect(mapStateToProps)(Home));
