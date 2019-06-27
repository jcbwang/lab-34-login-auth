import React from "react";
import { When } from "../if";
import "../todo/todo.scss";

import { TodoContext } from "../context/todo.context";
import ACLAuth from "../acl-auth/acl-auth.js";

export default class Form extends React.Component {
  static contextType = TodoContext;
  render() {
    return (
      <div>
        <ul>
          {this.context.todoList &&
            this.context.todoList.map(item => (
              <li
                className={`complete-${item.complete.toString()}`}
                key={item.id}
              >
                {/* version that user with delete capability sees */}
                <ACLAuth capability="delete">
                  <span onClick={() => this.context.toggleComplete(item.id)}>
                    {item.text}
                  </span>
                </ACLAuth>
                {/* version that user without delete capability sees */}
                <ACLAuth capability={!"delete"}>
                  <span>{item.text}</span>
                </ACLAuth>
                <ACLAuth capability="update">
                  <button onClick={() => this.context.toggleEdit(item.id)}>
                    edit
                  </button>
                </ACLAuth>
                <When condition={this.context.editing === item.id}>
                  <form onSubmit={this.context.updateItem}>
                    <input
                      onChange={this.context.handleInputChange}
                      id={item.id}
                      complete={item.complete}
                      defaultValue={item.text}
                    />
                  </form>
                </When>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
