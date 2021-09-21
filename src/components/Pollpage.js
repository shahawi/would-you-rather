import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

class PollPage extends Component {
  render() {


console.log( this.props.questions[this.props.id].optionOne.text)

    return (
      <Router>
        {this.props.id !== undefined && (
          <Fragment>
            <div>
              {
             this.props.questions[this.props.id].optionOne.text
              }
            </div>
          </Fragment>
        )}
      </Router>
    );
  }
}

function mapStateToProps(state,props) {
    const { id } = props.match.params

  return {
    state,
    id,
    authedUser: state.authedUser,
    questions: state.questions
  };
}

export default connect(mapStateToProps)(PollPage);
