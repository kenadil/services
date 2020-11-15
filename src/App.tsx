import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Homepage/HomePage";
import "antd/dist/antd.css";
import UsersPage from "./Pages/UsersPage/UsersPage";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Router>
      <Header>
        <span>Analytics</span>
      </Header>
      <Switch>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
