import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

class UnansweredQuestions extends Component {
  
    toPolPage = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/question/${id}`);
      };
    render() {

    const unAnsweredquestions = Object.values(this.props.questions).filter(
        (question) => question.answers !== null
      );
    return (
      <div className="tab-pane" id="a" role="tabpanel">
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
    );
  }
}

function mapStateToProps(state) {
  return {questions: state.questions}
}

export default connect(mapStateToProps)(UnansweredQuestions);
