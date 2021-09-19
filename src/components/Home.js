import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";


class Home extends Component {
  componentDidMount() {

    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    }

  }
  render() {
const questions = Object.values(this.props.questions);

    return (
      <Router>
        <Fragment>
          <div>
            {this.props.authedUser !== null && (
              <ul>
                {questions.map((question) => (
                  
                  <li key={question.id}>{question.id}</li>

                  )
                )}
              </ul>
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
