import React, { Component} from "react";

import { connect } from "react-redux";


class PollPage extends Component {

    componentDidMount(){
        if (this.props.authedUser === null) {
            alert("Please login first");
            this.props.history.push(`/Login`);
          }
    }
  render() {

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
