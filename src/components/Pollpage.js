import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'

class PollPage extends Component {

    componentDidMount(){
        console.log("shown")
        if (this.props.authedUser === null) {
            alert("Please login first");
            this.props.history.push(`/Login`);
          }
    }
  render() {
    console.log('poll',this.props);

    return (
  <div>
        { this.props.authedUser !==null && (
   
            <div>{this.props.questions[this.props.id].optionOne.text}</div>
       
        )}
</div>
    );
  }
}

function mapStateToProps(state, props) {
  const { id } = props.match.params;

  return {
    state,
    id,
    authedUser: state.authedUser,
    questions: state.questions,
  };
}

export default (connect(mapStateToProps)(PollPage));
