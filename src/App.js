import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// Context
import Provider from "./components/Context";

// Search
import Search from "./components/Search";
import Course from "./components/Course";

export default function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/course/:courseUrl" component={Course} />
        </Switch>
      </Router>
    </Provider>
  );
}
