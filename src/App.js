import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Provider from "./components/Context";

// Main Page
import Main from "./components/Main/Index";

// Search
import Search from "./components/Search/Index";

// Course
import Course from "./components/Course/Index";

export default function App() {
  window.APIUrl = "https://learning-valut-api.herokuapp.com";
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/search/:query" component={Search} />
          <Route exact path="/course/:courseUrl" component={Course} />
        </Switch>
      </Router>
    </Provider>
  );
}
