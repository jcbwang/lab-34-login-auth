import React from "react";
import superagent from "superagent";
import { AuthContext } from "../context/auth-context.js";

const If = props => {
  return !!props.condition ? props.children : null;
};

const API = process.env.REACT_APP_API;

export default class Signup extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    console.log(API);
    this.state = {
      username: "username",
      password: "password"
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    superagent
      .post(`${API}signin`)
      .auth(this.state.username, this.state.password)
      .then(response => {
        this.context.login(response.text);
      })
      .catch(console.error);
  };

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <button>Log Out</button>
        </If>

        <If condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input type="submit" value="Sign In" />
          </form>
        </If>
      </>
    );
  }
}
