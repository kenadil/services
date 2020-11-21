import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Homepage/HomePage";
import "antd/dist/antd.css";
import UsersPage from "./Pages/UsersPage/UsersPage";
import { Provider } from "react-redux";
import {store} from "./Store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/users">
            <UsersPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
