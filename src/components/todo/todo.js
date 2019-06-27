import React from "react";
import { When } from "../if";

import { TodoContext } from "../context/todo.context.js";

import "./todo.scss";

class ToDo extends React.Component {
  static contextType = TodoContext;
  render() {
    return (
      <>
        <section className="todo">
          <div>
            <form onSubmit={this.context.addItem}>
              <input
                placeholder="Add To Do List Item"
                onChange={this.context.handleInputChange}
              />
            </form>
          </div>
          <div>
            <ul>
              {this.context.todoList &&
                this.context.todoList.map(item => (
                  <li
                    className={`complete-${item.complete.toString()}`}
                    key={item.id}
                  >
                    <span onClick={() => this.context.toggleComplete(item.id)}>
                      {item.text}
                    </span>
                    <button onClick={() => this.context.toggleEdit(item.id)}>
                      edit
                    </button>
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
        </section>
      </>
    );
  }
}

export default ToDo;
