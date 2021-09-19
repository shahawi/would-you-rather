import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import authedUser from "../reducers/authedUser";

class Home extends Component {
  componentDidMount() {

   const {authedUser} = this.props.authedUser

  
    if (authedUser === null) {
        alert("Please login first");
        console.warn("no login");
        this.props.history.push(`/Login`)
    }
  }
  render() {
    return (
      <Router>
        <Fragment>

<div>
<ul>
{

}
</ul>
    </div>

        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps (authedUser)
{
return{
    authedUser
}
}

export default connect(mapStateToProps)(Home);
