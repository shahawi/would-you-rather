import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import '../Home.css'

class Home extends Component {
  componentDidMount() {
    if (this.props.authedUser === null) {
      alert("Please login first");
      this.props.history.push(`/Login`);
    }
  }
  render() {
    const questions = Object.values(this.props.questions);

    return (
      <Router>
        <Fragment>
          <div style={{alignSelf:'center', flex: 1, flexWrap: 'wrap'}} >
            {this.props.authedUser !== null && (
             <div    style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }}>
                {questions.map((question) => (
                  <div className="card" style ={{ width : "25rem" }} key = {question.id}>
                    <div className="card border-primary mb-3">
                      <h5 className="card-title">{question.author}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                       Would you rather
                      </h6>
                      <p class="card-text" style={{flex: 1, flexWrap: 'wrap'}}> {question.optionOne.text} or ....</p>
                      <button class="btn btn-primary" type="submit">View poll</button>
                   


                    </div>
                  </div>
                ))}
             </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
    questions: state.questions,
  };
}

export default connect(mapStateToProps)(Home);
