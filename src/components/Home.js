import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "../Home.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
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
        {this.props.authedUser !== null && (
          <Fragment>
            <ul class="nav nav-tabs">
              <li>
                <a href="#a" data-toggle="tab">
                  unAnsweredquestions
                </a>
              </li>
              <li>
                <a href="#b" data-toggle="tab">
                  answeredquestions
                </a>
              </li>
            </ul>

            <div class="tab-content">
              <div
                style={{
                  marginLeft: "10rem",
                }}
              >
                <div class="tab-pane active" id="a">
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
              </div>
            </div>
            <div
              class="tab-pane"
              id="b"
              style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                marginLeft: "25rem",
              }}
            >
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
          </Fragment>
        )}
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
