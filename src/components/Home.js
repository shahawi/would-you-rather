import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "../Home.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class Home extends Component {
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    }
  }
  render() {
    const unAnsweredquestions = Object.values(this.props.questions).filter(
      (question) => question.answers !== null
    );
    const answeredquestions = Object.values(this.props.questions).filter(
      (question) => question.answers === null
    );
    return (
      <Router>
        <Fragment>
          <div>
            {this.props.authedUser !== null && (
              <Tabs>
                <TabList
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10rem",
                  }}
                >
                  <Tab style={{ marginRight: "10rem" }}>
                    Unansered questions
                  </Tab>
                  <Tab>Answered questions</Tab>
                </TabList>

                <TabPanel
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    marginLeft: "25rem",
                  }}
                >
                  <div>
                    {unAnsweredquestions.map((question) => (
                      <div
                        className="card"
                        style={{
                          width: "25rem",
                          justifyContent: "center", //Centered vertically
                          alignItems: "center", // Centered horizontally
                          flex: 1,
                        }}
                        key={question.id}
                      >
                        <div className="card border-primary mb-3">
                          <h5 className="card-title">{question.author}</h5>
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
                          <button className="btn btn-primary" type="submit">
                            View poll
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    marginLeft: "25rem",
                  }}
                >
                  <div>
                    {answeredquestions.map((question) => (
                      <div
                        className="card"
                        style={{
                          width: "25rem",
                          justifyContent: "center", //Centered vertically
                          alignItems: "center", // Centered horizontally
                          flex: 1,
                        }}
                        key={question.id}
                      >
                        <div className="card border-primary mb-3">
                          <h5 className="card-title">{question.author}</h5>
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
                          <button className="btn btn-primary" type="submit">
                            View poll
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              </Tabs>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
    questions: state.questions,
  };
}

export default connect(mapStateToProps)(Home);
