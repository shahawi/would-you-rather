import { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";

class PollResults extends Component {
  constructor(props) {
    super(props);
    this.returnAvatar = this.returnAvatar.bind(this);
    this.handlecolor = this.handlecolor.bind(this);
  }
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    } else {
    }
  }

  handlecolor(option, question) {
    const user = this.props.usersArray.filter((a) => a.id === question.author);
    const answers = Object.entries(user[0].answers);
    const answer = answers.filter((a) => a[0] === question.id);

    return answer[0][1] === option;
  }

  returnAvatar(question) {
    const user = this.props.usersArray.filter((a) => a.id === question.author);
    const url = user[0].avatarURL;

    return {
      url,
    };
  }

  render() {
    var question = this.props.questions[this.props.id];
    var handlecolor = (option) => {
      const user = this.props.usersArray.filter(
        (a) => a.id === this.props.authedUser
      );
      const answers = Object.entries(user[0].answers);
      const answer = answers.filter((a) => a[0] === question.id);

      return answer[0][1] === option && "red";
    };
    return (
      <div style={{ marginLeft: "10rem" }}>
        {this.props.authedUser !== null && (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{question.author} asks:</Card.Title>
              <img
                alt="avatar"
                src={`../${this.returnAvatar(question).url}`}
                height="60px"
                width="60px"
              ></img>
              <Card.Text>Would you rather?</Card.Text>
              <div>
                <div style={{ color: handlecolor("optionOne") }}>
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
                <div style={{ color: handlecolor("optionTwo") }}>
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
  const usersArray = Object.values(state.users);

  return {
    state,
    id,
    authedUser: state.authedUser,
    usersArray,
    questions: state.questions,
  };
}
export default connect(mapStateToProps)(PollResults);
