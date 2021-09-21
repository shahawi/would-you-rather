import React, { Component } from "react";

import { connect } from "react-redux";
import { _formatQuestion, _saveQuestionAnswer } from "../_Data";
import Card from "react-bootstrap/Card";
import { Button } from "bootstrap";
import input from "react-input";
import { Router, withRouter } from "react-router";
import { addQuestionAnswer } from "../actions/questions";

class PollPage extends Component {
  constructor(props) {
    super(props);

    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    choice: "",
  };

  onChangeValue(e) {
    this.setState(() => ({
      choice: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.choice === "") {
      alert("Please make a choice!!");
    }
    const qid = this.props.id;
    const answer = this.state.choice;
    const authedUser = this.props.authedUser;
    const user = this.props.users[this.props.authedUser];
    const dispatch = this.props.dispatch
    dispatch(addQuestionAnswer (authedUser, qid,answer))
    this.props.history.push(`/results/${this.props.id}`)

    // _saveQuestionAnswer({
    //   authedUser,
    //   qid: id,
    //   answer: choice,
    // }).then(
    //   console.log(this.props),
    //   this.props.history.push(`/results/${this.props.id}`)
    // );
  }
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    } else {
      const question = this.props.questions[this.props.id];
      const formattedQuestion = _formatQuestion(
        question.optionOne,
        question.optionTwo,
        question.author
      );
    }
  }

  render() {
    return (
      <div style={{ marginLeft: "10rem" }}>
        {this.props.authedUser !== null && (
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>
                {this.props.questions[this.props.id].author} asks:
              </Card.Title>
              <Card.Text>Would you rather?</Card.Text>
              <div onChange={this.onChangeValue}>
                <input
                  type="radio"
                  value="optionOne"
                  name="radio"
                />
                {this.props.questions[this.props.id].optionOne.text}
                <br />
                <input
                  type="radio"
                  value="optionTwo"
                  name="radio"
                />
                {this.props.questions[this.props.id].optionTwo.text}
                <br />
                <button onClick={this.handleSubmit}>Submit</button>
              </div>
            </Card.Body>
          </Card>
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
    users: state.users,
  };
}

export default withRouter(connect(mapStateToProps)(PollPage));
