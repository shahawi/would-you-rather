import { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { _formatQuestion } from "../_Data";
import { Router } from "react-router";

class PollResults extends Component {
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    } else {
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
              <div>
                <div>
                  {this.props.questions[this.props.id].optionOne.text}
                  <br />
                  {"[" +
                    this.props.questions[this.props.id].optionOne.votes.length +
                    " votes]" +
                    "\n" +
                    (this.props.questions[this.props.id].optionOne.votes
                      .length /
                      (this.props.questions[this.props.id].optionOne.votes
                        .length +
                        this.props.questions[this.props.id].optionTwo.votes
                          .length)) *
                      100 +
                    "%"}
                </div>
                <br />
                <div>
                  {this.props.questions[this.props.id].optionTwo.text}
                  <br />
                  {"[" +
                    this.props.questions[this.props.id].optionTwo.votes.length +
                    " votes]" +
                    "\n" +
                    (this.props.questions[this.props.id].optionTwo.votes
                      .length /
                      (this.props.questions[this.props.id].optionOne.votes
                        .length +
                        this.props.questions[this.props.id].optionTwo.votes
                          .length)) *
                      100 +
                    "%"}
                </div>
                <br />
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
export default connect(mapStateToProps)(PollResults);
