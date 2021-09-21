import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "../Home.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { _formatQuestion } from "../_Data";

class Home extends Component {
  constructor(props) {
    super(props);

    this.toPollPage = this.toPollPage.bind(this);
    this.toPollResults = this.toPollResults.bind(this);
    this.returnAvatar = this.returnAvatar.bind(this);
  }

  returnAvatar(question) {
    const user = this.props.usersArray.filter((a) => a.id === question.author);
    const url = user[0].avatarURL;
    console.log(`{'${url}'}`)
    return {
      url,
    };
  }
  componentDidMount() {
    if (this.props.authedUser === null) {
      this.props.history.push(`/Login`);
    }
  }

  toPollPage = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`);
  };
  toPollResults = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/results/${id}`);
  };
  render() {
    if (this.props.authedUser !== null) {
      const authedUser = this.props.authedUser;
      var user = this.props.users[authedUser];
      var unAnsweredquestions = Object.values(this.props.questions).filter(
        (question) => !user.answers.hasOwnProperty(question.id)
      );

      var answeredquestions = Object.values(this.props.questions).filter(
        (question) => user.answers.hasOwnProperty(question.id)
      );

      unAnsweredquestions.sort((a, b) => b.timestamp - a.timestamp);
      answeredquestions.sort((a, b) => b.timestamp - a.timestamp);
    }

    return (
      <Router>
        {this.props.authedUser !== null && (
          <Fragment>
            <div
              style={{
                marginLeft: "5rem",
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
                          <img
                            alt="avatar"
                            src={`${this.returnAvatar(question).url}`}
                            height="60px"
                            width="60px"
                          ></img>
                          <h6 className="card-subtitle mb-2 text-muted">
                            Would you rather
                          </h6>
                          <p
                            className="card-text"
                            style={{ flex: 1, flexWrap: "wrap" }}
                          >
                            {" "}
                            {question.optionOne.text} or ....
                          </p>
                          <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={(e) => this.toPollPage(e, question.id)}
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
                          <img
                            alt="avatar"
                            src={`${this.returnAvatar(question).url}`}
                            height="60px"
                            width="60px"
                          ></img>
                          <h6 className="card-subtitle mb-2 text-muted">
                            Would you rather
                          </h6>
                          <p
                            className="card-text"
                            style={{ flex: 1, flexWrap: "wrap" }}
                          >
                            {" "}
                            {question.optionOne.text} or ....
                          </p>
                          <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={(e) => this.toPollResults(e, question.id)}
                          >
                            View poll
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>{" "}
                </TabPanel>
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
  const usersArray = Object.values(state.users);
  return {
    questions: state.questions,
    users: state.users,
    authedUser: state.authedUser,
    question,
    usersArray,
  };
}

export default connect(mapStateToProps)(Home);
