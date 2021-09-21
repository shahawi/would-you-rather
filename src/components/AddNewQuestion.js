import { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { _saveQuestion } from "../_Data";
import { addQuestion } from "../actions/questions";

class AddNewQuestion extends Component {
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    }
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    optionOne: "",
    optionTwo: "",
  };
  handleSubmit(e) {
    e.preventDefault();
    const optionOneText = this.state.optionOne;
    const optionTwoText = this.state.optionTwo;
    const dispatch = this.props.dispatch;
    const author = this.props.authedUser;
     _saveQuestion({ optionOneText, optionTwoText, author }).then((question) =>
      dispatch(addQuestion(question))
    );
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  render() {
    return (
      <div style={{ marginLeft: "10rem" }}>
        {this.props.authedUser !== null && (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Add a new question?</Card.Title>
              <Card.Text>Would you rather?</Card.Text>
              <form>
                <label>
                  Option one
                  <input
                    type="text"
                    name="optionOne"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  Option two
                  <input
                    type="text"
                    name="optionTwo"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </label>
              </form>
              <button onClick={this.handleSubmit}>Submit</button>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
    authedUser: state.authedUser,
    questions: state.questions,
  };
}

export default connect(mapStateToProps)(AddNewQuestion);
