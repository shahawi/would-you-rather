import { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { _formatQuestion } from "../_Data";
import { Router } from "react-router";

class PollResults extends Component {
  componentDidMount() {
      console.log(this.props)
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    } else {
      console.log("whay");
    }
  }

  render() {
    console.log("what");
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
                  <div />
                  <br />
                  <div />
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
