import React, { Component } from "react";

import { connect } from "react-redux";
import { _formatQuestion } from "../_Data";
import Card from "react-bootstrap/Card";
import { Button } from "bootstrap";
import input from "react-input";

class PollPage extends Component {
  
    constructor(props) {
        super(props);
    
 this.onChangeValue= this.onChangeValue.bind(this)
 this.handleSubmit= this.handleSubmit.bind(this)

        };
  state = {
choice: ""

  }

  onChangeValue(e)
  {
    
    this.setState(() => ({
        choice: e.target.value,
      }));
  }
  
    handleSubmit(e) {
    e.preventDefault();
    if(this.state.choice=== "")
    {
        alert("Please make a choice!!")
    }
        console.log(this.state.choice)
  }
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
      if (this.props.authedUser !== null) {
        const question = this.props.questions[this.props.id];
        const formattedQuestion = _formatQuestion(
          question.optionOne,
          question.optionTwo,
          question.author
        );
        console.log("form", formattedQuestion);
      }
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
                  value={this.props.questions[this.props.id].optionOne.text}
                  name= "radio"
                />
                {this.props.questions[this.props.id].optionOne.text}
                <br />
                <input
                  type="radio"
                  value={this.props.questions[this.props.id].optionTwo.text}
                  name=
                 "radio"
                  
                />
                {this.props.questions[this.props.id].optionTwo.text}

                <button onClick = {this.handleSubmit}>Submit</button>
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
  };
}

export default connect(mapStateToProps)(PollPage);
