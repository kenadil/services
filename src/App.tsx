import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Homepage/HomePage";
import "antd/dist/antd.css";
import UsersPage from "./Pages/UsersPage/UsersPage";
import { Provider } from "react-redux";
import {store} from "./Store/store";
import "react-toastify/dist/ReactToastify.css";
import ServicePage from "./Pages/ServicePage/ServicePage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/users">
            <UsersPage />
          </Route>
          <Route path="/services">
            <ServicePage />
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
