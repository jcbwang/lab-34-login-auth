import React from "react";

import AuthContext from "./components/context/auth-context";
import TodoContext from "./components/context/todo.context";

import ACLAuth from "./components/acl-auth/acl-auth.js";
import Counter from "./components/counter/counter.js";
import List from "./components/list/list.js";
import Form from "./components/form/form.js";
import Signup from "./components/signup/signup.js";

export default class App extends React.Component {
  render() {
    return (
      <>
        <AuthContext>
          <Signup />
          <ACLAuth>
            <TodoContext>
              <section className="todo">
                <Counter />
                <Form />
                <List />
              </section>
            </TodoContext>
          </ACLAuth>
        </AuthContext>
      </>
    );
  }
}
