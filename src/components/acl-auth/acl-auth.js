import React from "react";
import jsonWebToken from "jsonwebtoken";
import { AuthContext } from "../context/auth-context.js";

const If = props => {
  return !!props.condition ? props.children : null;
};

export default class ACLAuth extends React.Component {
  static contextType = AuthContext;

  render() {
    let shouldComponentRender = false;
    try {
      let userFromToken = null;
      if (this.context.token) {
        userFromToken = jsonWebToken.verify(
          this.context.token,
          process.env.REACT_APP_SECRET
        );
      }
      if (userFromToken !== null) {
        if (this.props.capability) {
          shouldComponentRender = userFromToken.capabilities.includes(
            this.props.capability
          );
        } else {
          shouldComponentRender = true;
        }
      }
    } catch (exception) {
      console.error(exception);
    }
    return (
      <If condition={shouldComponentRender}>
        <>{this.props.children}</>
      </If>
    );
  }
}
