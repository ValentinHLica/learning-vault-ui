import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// Context Provider
import Provider from "./components/Context";

// Components
import Search from "./components/Search/Main";
import Course from "./components/Course/Main";

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
