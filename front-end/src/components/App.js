import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App  extends Component {
  render() {
    return (
      <div>
        <h1>Wellcome to runners club!</h1>
        <Link to={"/signup"} >
          Signup
        </Link>
        <br/>
        <Link to={"/login"} >
          Login
        </Link>
      </div>
    );
  }
}
export default App;