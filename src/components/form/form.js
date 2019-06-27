import React from "react";

import { TodoContext } from "../context/todo.context";
import ACLAuth from "../acl-auth/acl-auth.js";

export default class Form extends React.Component {
  static contextType = TodoContext;
  render() {
    return (
      <ACLAuth capability="create">
        <div>
          <form onSubmit={this.context.addItem}>
            <input
              placeholder="Add To Do List Item"
              onChange={this.context.handleInputChange}
            />
          </form>
        </div>
      </ACLAuth>
    );
  }
}
